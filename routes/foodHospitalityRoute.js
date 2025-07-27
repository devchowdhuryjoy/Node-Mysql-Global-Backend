const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  courseFoodHospitality,
  getCourseFoodHospitality,
  updateCourseFoodHospitality,
  deleteCourseFoodHospitality,
} = require("../controllers/foodHospitalityController");

// POST: insert blog
router.post(
  "/course-food-hospitality",
  upload.single("image"),
  courseFoodHospitality
);

// GET: fetch all blog data
router.get("/course-food-hospitality-get", getCourseFoodHospitality);

router.put(
  "/course-food-hospitality-update/:id",
  upload.single("image"),
  updateCourseFoodHospitality
);
router.delete(
  "/course-food-hospitality-delete/:id",
  deleteCourseFoodHospitality
);

module.exports = router;
