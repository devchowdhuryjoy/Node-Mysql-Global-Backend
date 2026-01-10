const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAllRegistrations,
  deleteRegistration,
} = require("../controllers/registerController");

const { searchRegistrations } = require("../controllers/searchController");

router.post("/register", registerUser);
router.get("/registrations", getAllRegistrations);
router.delete("/registrationsdelete/:id", deleteRegistration);
router.get("/registrationssearch/search", searchRegistrations);

module.exports = router;
