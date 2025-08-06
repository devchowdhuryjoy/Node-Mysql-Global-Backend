const db = require("../config/db");
const SendEmailUtility = require("../utilitys/SendEmailUtility");

const registerScholarship = async (req, res) => {
  const { fullName, email, phone, scholarshipCountry } = req.body;

  if (!fullName) return res.status(400).json({ message: "Full name is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!phone) return res.status(400).json({ message: "Phone number is required" });
  if (!scholarshipCountry) return res.status(400).json({ message: "Scholarship country is required" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const sql = `
    INSERT INTO scholarship_registrations (full_name, email, phone, scholarship_country)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [fullName, email, phone, scholarshipCountry], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const emailSubject = "Scholarship Registration Confirmation - Global Routeway Consult";
    const emailText = `
Dear ${fullName},

Thank you for registering for a scholarship consultation with Global Routeway Consult.

Details:
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Scholarship Country: ${scholarshipCountry}

We will get back to you shortly.

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

const getScholarshipRegistrations = (req, res) => {
  const sql = "SELECT * FROM scholarship_registrations ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json(results);
  });
};

const deleteScholarshipRegistration = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM scholarship_registrations WHERE id = ?";

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

module.exports = {
  registerScholarship,
  getScholarshipRegistrations,
  deleteScholarshipRegistration,
};
