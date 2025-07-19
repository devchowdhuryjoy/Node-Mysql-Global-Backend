const db = require('../config/db');

// POST: Update or Insert video by ID
const updateVideoUrl = (req, res) => {
  const { id, url } = req.body;

  if (!url) return res.status(400).json({ message: "URL is required" });

  if (id) {
    const sql = `UPDATE videos SET url = ? WHERE id = ?`;
    db.query(sql, [url, id], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Video ID not found" });
      }
      res.status(200).json({ message: "Video URL updated successfully" });
    });
  } else {
    const sql = `INSERT INTO videos (url) VALUES (?)`;
    db.query(sql, [url], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(200).json({ message: "Video URL added successfully", id: result.insertId });
    });
  }
};

// GET: Fetch all video URLs
const getVideoUrls = (req, res) => {
  const sql = `SELECT * FROM videos ORDER BY id ASC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(200).json(results);
  });
};

module.exports = { updateVideoUrl, getVideoUrls };
