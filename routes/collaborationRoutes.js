const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createCollaboration,
  getCollaborations,
  updateCollaboration,
  deleteCollaboration,
} = require("../controllers/collaborationController");

// Create
router.post("/collaborations", upload.single("image"), createCollaboration);

//  Read
router.get("/collaborations", getCollaborations);

//  Update
router.put("/collaborations/:id", upload.single("image"), updateCollaboration);

//  Delete
router.delete("/collaborations/:id", deleteCollaboration);

module.exports = router;
