const express = require("express");

const app = express();

app.use("/api/posts", (req, res, next) => {
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
