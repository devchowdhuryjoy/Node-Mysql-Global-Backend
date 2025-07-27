const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  courseBusiness,
  getCourseBusiness,
  updateCourseBusiness,
  deleteCourseBusiness,
} = require("../controllers/businessController");

// POST route: insert business blog
router.post("/course-business", upload.single("image"), courseBusiness);

// GET route: fetch all business blog data
router.get("/course-business-get", getCourseBusiness);

router.put(
  "/course-business-update/:id",
  upload.single("image"),
  updateCourseBusiness
);
router.delete("/course-business-delete/:id", deleteCourseBusiness);

module.exports = router;
