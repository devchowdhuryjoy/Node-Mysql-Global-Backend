const db = require('../config/db');

// POST: Register user
const registerUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nearestOffice,
    preferredDestination,
    testStatus,
    fundingPlan
  } = req.body;

  const sql = `
    INSERT INTO registrations 
    (first_name, last_name, email, phone, nearest_office, preferred_destination, test_status, funding_plan) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [firstName, lastName, email, phone, nearestOffice, preferredDestination, testStatus, fundingPlan],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'Registration successful' });
    }
  );
};

// GET: Get all registered users
const getAllRegistrations = (req, res) => {
  const sql = `SELECT * FROM registrations ORDER BY created_at DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
};

module.exports = { registerUser, getAllRegistrations };
