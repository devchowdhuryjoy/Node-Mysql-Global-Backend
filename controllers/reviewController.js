const db = require('../config/db');

// POST: Submit review
const submitReview = (req, res) => {
  const data = Array.isArray(req.body) ? req.body[0] : req.body;

  const { name, review_text, rating } = data;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Parsed data:', { name, review_text, rating });
  console.log('Image:', req.file);

  const sql = `
    INSERT INTO reviews (name, review_text, rating, image_url)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, review_text, rating, image_url], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Review submitted successfully' });
  });
};

// GET: All reviews
const getAllReviews = (req, res) => {
  const sql = `SELECT * FROM reviews ORDER BY created_at DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
};

module.exports = { submitReview, getAllReviews };
