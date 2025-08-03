const express = require("express");
const router = express.Router();
const { registerCountrySelection,getCountryRegistrations,deleteCountryRegistration } = require("../controllers/countryRegisterController");

router.post("/countryregister", registerCountrySelection);
router.get("/countryregister", getCountryRegistrations);
router.delete("/countryregister/:id", deleteCountryRegistration);

module.exports = router;

