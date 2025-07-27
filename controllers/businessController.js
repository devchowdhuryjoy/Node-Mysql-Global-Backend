const db = require("../config/db");

// POST: Insert business blog
const courseBusiness = (req, res) => {
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text || !image || !content) {
    return res
      .status(400)
      .json({ message: "Text, image, and content are required." });
  }

  const sql = `
    INSERT INTO business_studies_blog (text, image, content)
    VALUES (?, ?, ?)
  `;
  const values = [text, image, content];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting into business_studies_blog:", err);
      return res.status(500).json({ message: "Insert failed" });
    }

    res.json({
      message: "Business blog inserted successfully",
      blogId: result.insertId,
      image,
    });
  });
};

// GET: Fetch all business blog entries
const getCourseBusiness = (req, res) => {
  const sql = `SELECT * FROM business_studies_blog ORDER BY id DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching from business_studies_blog:", err);
      return res.status(500).json({ message: "Fetch failed" });
    }

    res.json(results);
  });
};

// ✅ PUT: Update a business blog entry
const updateCourseBusiness = (req, res) => {
  const { id } = req.params;
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = "";
  let values = [];

  if (image) {
    sql = `UPDATE business_studies_blog SET text = ?, image = ?, content = ? WHERE id = ?`;
    values = [text, image, content, id];
  } else {
    sql = `UPDATE business_studies_blog SET text = ?, content = ? WHERE id = ?`;
    values = [text, content, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating business_studies_blog:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Business blog updated successfully" });
  });
};

// ✅ DELETE: Delete a business blog entry
const deleteCourseBusiness = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM business_studies_blog WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from business_studies_blog:", err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "Business blog deleted successfully" });
  });
};

module.exports = {
  courseBusiness,
  getCourseBusiness,
  updateCourseBusiness,
  deleteCourseBusiness,
};
