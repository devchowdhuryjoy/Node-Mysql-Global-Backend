const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  courseAccounting,
  getCourseAccounting,
  updateCourseAccounting,
  deleteCourseAccounting,
} = require("../controllers/accountingController");

// ✅ POST route: insert accounting blog
router.post("/course-accounting", upload.single("image"), courseAccounting);

// ✅ GET route: fetch all accounting blog data
router.get("/course-accounting-get", getCourseAccounting);

router.put(
  "/course-accounting-update/:id",
  upload.single("image"),
  updateCourseAccounting
);
router.delete("/course-accounting-delete/:id", deleteCourseAccounting);

module.exports = router;
