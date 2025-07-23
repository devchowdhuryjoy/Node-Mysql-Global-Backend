const express = require("express");
const router = express.Router();
const { getAllBlogs, getBlogBySlug, addBlog,  } = require("../controllers/blogController");
const upload = require("../middleware/uploadMiddleware");

// GET all blogs (for listing page)
router.get("/blog", getAllBlogs);

// GET single blog by slug (for details page)
router.get("/blogs/:slug", getBlogBySlug);

// POST: Add blog with image upload
router.post("/blogs", upload.single("image"), addBlog);


module.exports = router;