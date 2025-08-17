const db = require("../config/db");

const searchRegistrations = (req, res) => {
  let { name, email, phone, page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const offset = (page - 1) * limit;

  let conditions = [];
  let values = [];

  if (name) {
    name = name.trim().toLowerCase();
    conditions.push("(LOWER(CONCAT(first_name,' ',last_name)) LIKE ?)");
    values.push(`%${name}%`);
  }

  if (email) {
    email = email.trim().toLowerCase();
    conditions.push("LOWER(email) LIKE ?");
    values.push(`%${email}%`);
  }

  if (phone) {
    phone = phone.trim();
    conditions.push("phone LIKE ?");
    values.push(`%${phone}%`);
  }

  if (conditions.length === 0) {
    return res.status(400).json({ message: "Please provide at least one search parameter" });
  }

  const whereClause = conditions.join(" OR ");
  const sql = `SELECT * FROM registrations WHERE ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`;

  db.query(sql, [...values, limit, offset], (err, results) => {
    if (err) {
      console.error("Search error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const countSql = `SELECT COUNT(*) as total FROM registrations WHERE ${whereClause}`;
    db.query(countSql, values, (countErr, countResult) => {
      if (countErr) {
        console.error("Count error:", countErr);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(200).json({
        data: results,
        total: countResult[0].total,
        page,
        limit,
      });
    });
  });
};

module.exports = { searchRegistrations };
