const express = require ("express");
const router = express.Router ();
// Import the controllers
const { createComment } = require ("../controllers/comments.controller.js");
const { createPost } = require ("../controllers/posts.controller.js");
const { fetchPosts } = require ("../controllers/posts.controller.js");
const { likePost } = require ("../controllers/likes.controller.js");
const { unlikePost } = require ("../controllers/likes.controller.js");

// define the API routes
router.post ("/comments/create", createComment);
router.post ("/posts/create", createPost);
router.get ("/posts", fetchPosts);
router.post ("/likes/like", likePost);
router.post ("/likes/unlike", unlikePost);



module.exports = router;