const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  courseNurse,
  getCourseNurse,
} = require("../controllers/nursingController");

// POST route: insert blog
router.post("/course-nurse", upload.single("image"), courseNurse);

// ✅ GET route: fetch all blog data
router.get("/course-nurse-get", getCourseNurse);

module.exports = router;
