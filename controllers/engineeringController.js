const db = require("../config/db");

// POST: Insert engineering blog
const courseEngineering = (req, res) => {
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text || !image || !content) {
    return res
      .status(400)
      .json({ message: "Text, image, and content are required." });
  }

  const sql = `
    INSERT INTO engineering_blog (text, image, content)
    VALUES (?, ?, ?)
  `;
  const values = [text, image, content];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting into engineering_blog:", err);
      return res.status(500).json({ message: "Insert failed" });
    }

    res.json({
      message: "Engineering blog inserted successfully",
      blogId: result.insertId,
      image,
    });
  });
};

// GET: Fetch all engineering blog entries
const getCourseEngineering = (req, res) => {
  const sql = `SELECT * FROM engineering_blog ORDER BY id DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching from engineering_blog:", err);
      return res.status(500).json({ message: "Fetch failed" });
    }

    res.json(results);
  });
};

// ✅ PUT: Update engineering blog by ID
const updateCourseEngineering = (req, res) => {
  const { id } = req.params;
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = "";
  let values = [];

  if (image) {
    sql = `UPDATE engineering_blog SET text = ?, image = ?, content = ? WHERE id = ?`;
    values = [text, image, content, id];
  } else {
    sql = `UPDATE engineering_blog SET text = ?, content = ? WHERE id = ?`;
    values = [text, content, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating engineering_blog:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Blog updated successfully" });
  });
};

// ✅ DELETE: Delete engineering blog by ID
const deleteCourseEngineering = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM engineering_blog WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from engineering_blog:", err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "Blog deleted successfully" });
  });
};

module.exports = {
  courseEngineering,
  getCourseEngineering,
  updateCourseEngineering,
  deleteCourseEngineering,
};
