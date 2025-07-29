const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createLeader,
  getLeaders,
  updateLeader,
  deleteLeader,
} = require("../controllers/leadershipController");

router.post("/leadership", upload.single("image"), createLeader);
router.get("/leadership", getLeaders);
router.put("/leadership/:id", upload.single("image"), updateLeader);
router.delete("/leadership/:id", deleteLeader);

module.exports = router;
