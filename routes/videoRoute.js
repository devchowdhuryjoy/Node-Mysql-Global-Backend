const express = require('express');
const router = express.Router();
const { updateVideoUrl, getVideoUrls } = require('../controllers/videoController');

router.post('/video', updateVideoUrl); // for Save/Publish
router.get('/videos', getVideoUrls);   // optional: fetch from DB for frontend

module.exports = router;
