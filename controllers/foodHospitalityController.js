const db = require("../config/db");

// POST: Insert Food and Hospitality blog
const courseFoodHospitality = (req, res) => {
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text || !image || !content) {
    return res
      .status(400)
      .json({ message: "Text, image, and content are required." });
  }

  const sql = `
    INSERT INTO food_hospitality_blog (text, image, content)
    VALUES (?, ?, ?)
  `;
  const values = [text, image, content];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting into food_hospitality_blog:", err);
      return res.status(500).json({ message: "Insert failed" });
    }

    res.json({
      message: "Food & Hospitality blog inserted successfully",
      blogId: result.insertId,
      image,
    });
  });
};

// GET: Fetch all Food and Hospitality blog entries
const getCourseFoodHospitality = (req, res) => {
  const sql = `SELECT * FROM food_hospitality_blog ORDER BY id DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching from food_hospitality_blog:", err);
      return res.status(500).json({ message: "Fetch failed" });
    }

    res.json(results);
  });
};

// ✅ PUT: Update Food and Hospitality blog
const updateCourseFoodHospitality = (req, res) => {
  const { id } = req.params;
  const { text, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = "";
  let values = [];

  if (image) {
    sql = `UPDATE food_hospitality_blog SET text = ?, image = ?, content = ? WHERE id = ?`;
    values = [text, image, content, id];
  } else {
    sql = `UPDATE food_hospitality_blog SET text = ?, content = ? WHERE id = ?`;
    values = [text, content, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating food_hospitality_blog:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Blog updated successfully" });
  });
};

// ✅ DELETE: Delete Food and Hospitality blog
const deleteCourseFoodHospitality = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM food_hospitality_blog WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from food_hospitality_blog:", err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "Blog deleted successfully" });
  });
};

module.exports = {
  courseFoodHospitality,
  getCourseFoodHospitality,
  updateCourseFoodHospitality,
  deleteCourseFoodHospitality,
};
