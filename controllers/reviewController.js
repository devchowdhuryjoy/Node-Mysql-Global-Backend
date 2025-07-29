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


// PUT: Update review
const updateReview = (req, res) => {
  const { id } = req.params;
  const { name, review_text, rating } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = image_url
    ? `UPDATE reviews SET name = ?, review_text = ?, rating = ?, image_url = ? WHERE id = ?`
    : `UPDATE reviews SET name = ?, review_text = ?, rating = ? WHERE id = ?`;

  const values = image_url
    ? [name, review_text, rating, image_url, id]
    : [name, review_text, rating, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  });
};

// DELETE: Remove review
const deleteReview = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM reviews WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  });
};

module.exports = { submitReview, getAllReviews, updateReview,
  deleteReview };
