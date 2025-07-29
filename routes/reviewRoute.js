const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitReview, getAllReviews,updateReview,deleteReview, } = require('../controllers/reviewController');

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post('/reviewpost', upload.single('image'), submitReview);
router.get('/reviewget', getAllReviews);
router.put('/reviewupdate/:id', upload.single('image'), updateReview);
router.delete('/reviewdelete/:id', deleteReview);

module.exports = router;
