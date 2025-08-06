const db = require("../config/db");

// GET all visa success entries
const getAllVisaSuccess = (req, res) => {
  const sql = "SELECT * FROM visa_success ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching visa success entries:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

// POST: Add new visa success entry
const addVisaSuccess = (req, res) => {
  const { text } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text || !image) {
    return res.status(400).json({ message: "Image and text are required" });
  }

  const sql = "INSERT INTO visa_success (image, text) VALUES (?, ?)";
  db.query(sql, [image, text], (err, result) => {
    if (err) {
      console.error("Error inserting visa success:", err);
      return res.status(500).json({ message: "Insert failed" });
    }
    res.json({ message: "Visa success entry added", id: result.insertId });
  });
};

// PUT: Update visa success entry by ID
const updateVisaSuccess = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  let sql, values;

  if (image) {
    sql = "UPDATE visa_success SET text = ?, image = ? WHERE id = ?";
    values = [text, image, id];
  } else {
    sql = "UPDATE visa_success SET text = ? WHERE id = ?";
    values = [text, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating entry:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Entry updated successfully" });
  });
};


// DELETE: Remove visa success entry by ID
const deleteVisaSuccess = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM visa_success WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error deleting entry:", err);
      return res.status(500).json({ message: "Delete failed" });
    }
    res.json({ message: "Entry deleted successfully" });
  });
};

module.exports = {
  getAllVisaSuccess,
  addVisaSuccess,
  deleteVisaSuccess,
  updateVisaSuccess
};
