const db = require('../config/db');

// POST: Submit to reviewtwo (no rating)
const submitReviewTwo = (req, res) => {
  const data = Array.isArray(req.body) ? req.body[0] : req.body;
  const { name, review_text } = data;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    INSERT INTO reviewtwo (name, review_text, image_url)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, review_text, image_url], (err, result) => {
    if (err) {
      console.error('Insert error (reviewtwo):', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Review (two) submitted successfully' });
  });
};

// GET: All reviews from reviewtwo
const getAllReviewsTwo = (req, res) => {
  const sql = `SELECT * FROM reviewtwo ORDER BY created_at DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Fetch error (reviewtwo):', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  submitReviewTwo,
  getAllReviewsTwo,
};
