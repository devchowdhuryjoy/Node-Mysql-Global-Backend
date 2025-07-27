const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAllRegistrations,
  deleteRegistration,
} = require("../controllers/registerController");

router.post("/register", registerUser);
router.get("/registrations", getAllRegistrations);
router.delete("/registrationsdelete/:id", deleteRegistration);

module.exports = router;
