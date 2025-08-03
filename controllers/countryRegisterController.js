const db = require("../config/db");
const SendEmailUtility = require("../utilitys/SendEmailUtility");

const registerCountrySelection = async (req, res) => {
  const { name, email, country, universities } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!country) return res.status(400).json({ message: "Country is required" });
  if (!universities || !Array.isArray(universities) || universities.length === 0) {
    return res.status(400).json({ message: "At least one university must be selected" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const universityList = universities.join(", ");

  const sql = `
    INSERT INTO country_registrations (name, email, country, universities)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, country, universityList], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const emailSubject = "University Selection - Global Routeway Consult";
    const emailText = `
Dear ${name},

Thank you for selecting universities with Global Routeway Consult.

Details:
Name: ${name}
Email: ${email}
Country: ${country}
Universities: ${universityList}

Regards,
Global Routeway Consult Team
    `;

    try {
      await SendEmailUtility(email, emailText, emailSubject);
      res.status(200).json({ message: "Submission successful and email sent" });
    } catch (emailErr) {
      console.error("Email error:", emailErr);
      res.status(200).json({ message: "Submission successful but email failed" });
    }
  });
};

const getCountryRegistrations = (req, res) => {
  const sql = "SELECT * FROM country_registrations ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json(results);
  });
};

const deleteCountryRegistration = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM country_registrations WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database delete error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json({ message: "Registration deleted successfully" });
  });
};


module.exports = { registerCountrySelection,  getCountryRegistrations,deleteCountryRegistration };

