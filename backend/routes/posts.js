const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const PostsController = require("../controllers/posts");

const router = express.Router();

//adding post
router.post("", checkAuth, extractFile, PostsController.addPost);

//getting all posts
router.get("", PostsController.getAllPosts);

//getting specific post
router.get("/:id", PostsController.getPost);

//deleting post
router.delete("/:id", checkAuth, PostsController.deletePost);

//updating post
router.put("/:id", checkAuth, extractFile, PostsController.updatePost);

module.exports = router;
