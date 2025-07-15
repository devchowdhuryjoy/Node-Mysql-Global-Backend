const express = require('express');
const router = express.Router();

const { registerUser, getAllRegistrations } = require('../controllers/registerController');

router.post('/register', registerUser);
router.get('/registrations', getAllRegistrations);

module.exports = router;
