const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitReviewTwo, getAllReviewsTwo,updateReviewTwo,deleteReviewTwo } = require('../controllers/reviewTwoController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.post('/reviewtwopost', upload.single('image'), submitReviewTwo);
router.get('/reviewtwoget', getAllReviewsTwo);
router.put('/reviewtwoupdate/:id', upload.single('image'), updateReviewTwo);
router.delete('/reviewtwodelete/:id', deleteReviewTwo);

module.exports = router;
