const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");
const postsRoutes = require("./routes/posts");

const app = express();

//connection string
mongoose
  .connect(
    "mongodb+srv://jacob:u3QzvQOPzwquVBIV@cluster0.wqdapct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

//parsing request to json
app.use(bodyParser.json());

//fixing CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
