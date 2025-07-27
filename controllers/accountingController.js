const db = require("../config/db");

// ✅ POST: Insert accounting blog
const courseAccounting = (req, res) => {
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text || !image || !content) {
    return res
      .status(400)
      .json({ message: "Text, image, and content are required." });
  }

  const sql = `
    INSERT INTO accounting_blog (text, image, content)
    VALUES (?, ?, ?)
  `;
  const values = [text, image, content];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting into accounting_blog:", err);
      return res.status(500).json({ message: "Insert failed" });
    }

    res.json({
      message: "Course blog inserted successfully",
      blogId: result.insertId,
      image,
    });
  });
};

// ✅ GET: Fetch all accounting blog entries
const getCourseAccounting = (req, res) => {
  const sql = `SELECT * FROM accounting_blog ORDER BY id DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching from accounting_blog:", err);
      return res.status(500).json({ message: "Fetch failed" });
    }

    res.json(results);
  });
};

// ✅ PUT: Update accounting blog by ID
const updateCourseAccounting = (req, res) => {
  const { id } = req.params;
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = "";
  let values = [];

  if (image) {
    sql = `UPDATE accounting_blog SET text = ?, image = ?, content = ? WHERE id = ?`;
    values = [text, image, content, id];
  } else {
    sql = `UPDATE accounting_blog SET text = ?, content = ? WHERE id = ?`;
    values = [text, content, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating accounting_blog:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Blog updated successfully" });
  });
};

// ✅ DELETE: Delete accounting blog by ID
const deleteCourseAccounting = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM accounting_blog WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from accounting_blog:", err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "Blog deleted successfully" });
  });
};

module.exports = {
  courseAccounting,
  getCourseAccounting,
  updateCourseAccounting,
  deleteCourseAccounting,
};
