// const express = require("express");
// const router = express.Router();
// const { getAllBlogs, getBlogBySlug, addBlog,  } = require("../controllers/blogController");
// const upload = require("../middleware/uploadMiddleware");

// // GET all blogs (for listing page)
// router.get("/blog", getAllBlogs);

// // GET single blog by slug (for details page)
// router.get("/blogs/:slug", getBlogBySlug);

// // POST: Add blog with image upload
// router.post("/blogs", upload.single("image"), addBlog);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogBySlug,
  addBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController");

const upload = require("../middleware/uploadMiddleware");

// GET all blogs
router.get("/blog", getAllBlogs);

// GET blog by slug
router.get("/blogs/:slug", getBlogBySlug);

// POST new blog
router.post("/blogs", upload.single("image"), addBlog);

// PUT update blog by ID
router.put("/blogs/:id", upload.single("image"), editBlog);

// DELETE blog by ID
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
