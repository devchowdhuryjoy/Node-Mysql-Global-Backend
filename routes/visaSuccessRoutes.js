const express = require("express");
const router = express.Router();
const {
  getAllVisaSuccess,
  addVisaSuccess,
  deleteVisaSuccess,
  updateVisaSuccess,
} = require("../controllers/visaSuccessController");

const upload = require("../middleware/uploadMiddleware");

// GET all entries
router.get("/visa-success", getAllVisaSuccess);

// POST new entry (image + text)
router.post("/visa-success", upload.single("image"), addVisaSuccess);

// Update new entry (image + text)
router.put("/visa-success/:id", upload.single("image"), updateVisaSuccess);

// DELETE entry by ID
router.delete("/visa-success/:id", deleteVisaSuccess);

module.exports = router;
