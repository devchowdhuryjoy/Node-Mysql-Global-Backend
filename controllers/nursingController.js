const db = require("../config/db");

// POST: Insert nursing blog
const courseNurse = (req, res) => {
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text || !image || !content) {
    return res
      .status(400)
      .json({ message: "Text, image, and content are required." });
  }

  const sql = `
    INSERT INTO nursing_blog (text, image, content)
    VALUES (?, ?, ?)
  `;
  const values = [text, image, content];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting into nursing_blog:", err);
      return res.status(500).json({ message: "Insert failed" });
    }

    res.json({
      message: "Course blog inserted successfully",
      blogId: result.insertId,
      image,
    });
  });
};

// ✅ GET: Fetch all nursing blog entries
const getCourseNurse = (req, res) => {
  const sql = `SELECT * FROM nursing_blog ORDER BY id DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching from nursing_blog:", err);
      return res.status(500).json({ message: "Fetch failed" });
    }

    res.json(results);
  });
};

module.exports = { courseNurse, getCourseNurse };
