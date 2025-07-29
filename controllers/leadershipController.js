const db = require("../config/db");

// ✅ Create
const createLeader = (req, res) => {
  const { name, title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !title || !description || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `INSERT INTO leadership (name, title, image, description) VALUES (?, ?, ?, ?)`;
  const values = [name, title, image, JSON.stringify(description)];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Insert failed" });
    res.json({ message: "Leader created successfully", id: result.insertId });
  });
};

// ✅ Read
const getLeaders = (req, res) => {
  const sql = `SELECT * FROM leadership ORDER BY id DESC`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch failed" });

    // Parse description JSON string to array
    const parsed = results.map(item => ({
      ...item,
      description: JSON.parse(item.description)
    }));

    res.json(parsed);
  });
};

// ✅ Update
const updateLeader = (req, res) => {
  const { id } = req.params;
  const { name, title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  let sql, values;

  if (image) {
    sql = `UPDATE leadership SET name = ?, title = ?, image = ?, description = ? WHERE id = ?`;
    values = [name, title, image, JSON.stringify(description), id];
  } else {
    sql = `UPDATE leadership SET name = ?, title = ?, description = ? WHERE id = ?`;
    values = [name, title, JSON.stringify(description), id];
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    res.json({ message: "Leader updated successfully" });
  });
};

// ✅ Delete
const deleteLeader = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM leadership WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ message: "Leader deleted successfully" });
  });
};

module.exports = {
  createLeader,
  getLeaders,
  updateLeader,
  deleteLeader
};
