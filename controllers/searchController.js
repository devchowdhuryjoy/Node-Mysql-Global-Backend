const db = require("../config/db");

const searchRegistrations = (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;
  const searchQuery = `%${q}%`;

  const sql = `
    SELECT * FROM registrations 
    WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [searchQuery, searchQuery, searchQuery, searchQuery, parseInt(limit), parseInt(offset)], (err, results) => {
    if (err) {
      console.error("Search error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // total count for pagination
    const countSql = `
      SELECT COUNT(*) as total FROM registrations
      WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?
    `;
    db.query(countSql, [searchQuery, searchQuery, searchQuery, searchQuery], (countErr, countResult) => {
      if (countErr) {
        console.error("Count error:", countErr);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(200).json({
        data: results,
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
      });
    });
  });
};

module.exports = { searchRegistrations };
