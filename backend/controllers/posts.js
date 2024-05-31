const Post = require("../models/post");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

exports.addPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Post added",
      post: {
        id: result._id,
        title: result.title,
        content: result.content,
        imagePath: result.imagePath,
      },
    });
  });
};

exports.getAllPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((docs) => {
      fetchedPosts = docs;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Post fetched succesfully!",
        posts: fetchedPosts,
        maxPosts: count,
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      if (result.deletedCount > 0)
        res.status(200).json({ message: "Post deleted" });
      else res.status(401).json({ message: "Unauthorized update" });
    }
  );
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
  });
  Post.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    post
  ).then((result) => {
    console.log(result);
    if (result.matchedCount > 0)
      res.status(200).json({ message: "Update successfull" });
    else res.status(401).json({ message: "Unauthorized update" });
  });
};
