const express = require("express");
const router = express.Router();
const { getAllBlogs, addBlog } = require("../controllers/blogController");
const upload = require("../middleware/uploadMiddleware");

// GET all blogs
router.get("/blog", getAllBlogs);

// POST: Add blog with image upload (key must be 'image')
router.post("/blogs", upload.single("image"), addBlog);

module.exports = router;
