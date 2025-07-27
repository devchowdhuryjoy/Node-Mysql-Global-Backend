const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  courseNurse,
  getCourseNurse,
  updateCourseNurse,
  deleteCourseNurse,
} = require("../controllers/nursingController");

// POST route: insert blog
router.post("/course-nurse", upload.single("image"), courseNurse);

// ✅ GET route: fetch all blog data
router.get("/course-nurse-get", getCourseNurse);

// ✅ PUT route: update blog by ID
router.put(
  "/course-nurse-update/:id",
  upload.single("image"),
  updateCourseNurse
);

// ✅ DELETE route: delete blog by ID
router.delete("/course-nurse-delete/:id", deleteCourseNurse);

module.exports = router;
