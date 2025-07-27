const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  courseEngineering,
  getCourseEngineering,
  updateCourseEngineering,
  deleteCourseEngineering,
} = require("../controllers/engineeringController");

// POST: insert blog
router.post("/course-engineering", upload.single("image"), courseEngineering);

// GET: fetch all blog data
router.get("/course-engineering-get", getCourseEngineering);

router.put(
  "/course-engineering-update/:id",
  upload.single("image"),
  updateCourseEngineering
);
router.delete("/course-engineering-delete/:id", deleteCourseEngineering);

module.exports = router;
