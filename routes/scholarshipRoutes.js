const express = require("express");
const router = express.Router();
const {
  registerScholarship,
  getScholarshipRegistrations,
  deleteScholarshipRegistration,
} = require("../controllers/scholarshipRegisterController");

router.post("/scholarship-register", registerScholarship);
router.get("/scholarship-register", getScholarshipRegistrations);
router.delete("/scholarship-register/:id", deleteScholarshipRegistration);

module.exports = router;
