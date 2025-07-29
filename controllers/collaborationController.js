const db = require("../config/db");

// ✅ CREATE Collaboration (Text + Image)
const createCollaboration = (req, res) => {
  const { text } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text || !image) {
    return res.status(400).json({ message: "Text and image are required." });
  }

  const sql = `INSERT INTO collaborations (text, image) VALUES (?, ?)`;
  const values = [text, image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ message: "Insert failed" });
    }

    res.json({
      message: "Collaboration created successfully",
      collaborationId: result.insertId,
      image,
    });
  });
};

// ✅ READ all Collaborations
const getCollaborations = (req, res) => {
  const sql = `SELECT * FROM collaborations ORDER BY id DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch Error:", err);
      return res.status(500).json({ message: "Fetch failed" });
    }

    res.json(results);
  });
};

// ✅ UPDATE Collaboration by ID
const updateCollaboration = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = "";
  let values = [];

  if (image) {
    sql = `UPDATE collaborations SET text = ?, image = ? WHERE id = ?`;
    values = [text, image, id];
  } else {
    sql = `UPDATE collaborations SET text = ? WHERE id = ?`;
    values = [text, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update Error:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Collaboration updated successfully" });
  });
};

// ✅ DELETE Collaboration by ID
const deleteCollaboration = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM collaborations WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete Error:", err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "Collaboration deleted successfully" });
  });
};

module.exports = {
  createCollaboration,
  getCollaborations,
  updateCollaboration,
  deleteCollaboration,
};
