const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "12312",
      title: "First server side post",
      content: "This is coming from server",
    },
    {
      id: "2352",
      title: "First server side post n2",
      content: "This is coming from server!",
    },
  ];
  res.status(200).json({
    message: "Post fetched succesfully!",
    posts: posts,
  });
});

module.exports = app;
