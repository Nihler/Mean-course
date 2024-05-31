const express = require("express");
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");
const PostsController = require("../controllers/posts");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

//setting up multer - package to parse files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + extension);
  },
});

//adding post
router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  PostsController.addPost
);

//getting all posts
router.get("", PostsController.getAllPosts);

//getting specific post
router.get("/:id", PostsController.getPost);

//deleting post
router.delete("/:id", checkAuth, PostsController.deletePost);

//updating post
router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  PostsController.updatePost
);

module.exports = router;
