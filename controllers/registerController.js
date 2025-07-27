const db = require("../config/db");
const SendEmailUtility = require("../utilitys/SendEmailUtility");

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nearestOffice,
    preferredDestination,
    testStatus,
    fundingPlan,
    agreedToTerms,
  } = req.body;

  // ✅ Field validations
  if (!firstName)
    return res.status(400).json({ message: "First name is required" });
  if (!lastName)
    return res.status(400).json({ message: "Last name is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!phone)
    return res.status(400).json({ message: "Phone number is required" });
  if (!nearestOffice)
    return res.status(400).json({ message: "Nearest office is required" });
  if (!preferredDestination)
    return res
      .status(400)
      .json({ message: "Preferred destination is required" });
  if (!testStatus)
    return res.status(400).json({ message: "English test status is required" });
  if (!fundingPlan)
    return res.status(400).json({ message: "Funding plan is required" });

  // ✅ Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // ✅ Phone format check
  const phoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  // ✅ Insert into MySQL
  const sql = `
    INSERT INTO registrations 
    (first_name, last_name, email, phone, nearest_office, preferred_destination, test_status, funding_plan) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      firstName,
      lastName,
      email,
      phone,
      nearestOffice,
      preferredDestination,
      testStatus,
      fundingPlan,
    ],
    async (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // ✅ Email content
      const emailSubject = "Registration Successful - Global Routeway Consult";
      const emailText = `
Dear ${firstName} ${lastName},

Thank you for registering with Global Routeway Consult. We have received your information and will contact you shortly.

Here are your registration details:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Nearest Office: ${nearestOffice}
Study Destination: ${preferredDestination}
English Test Status: ${testStatus}
Funding Plan: ${fundingPlan}
Agreed to Terms: ${agreedToTerms ? "Yes" : "No"}

Regards,
Global Routeway Consult Team
    `;

      try {
        await SendEmailUtility(email, emailText, emailSubject);
        res
          .status(200)
          .json({ message: "Registration successful and email sent" });
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
        res.status(200).json({
          message: "Registration successful but email failed to send",
        });
      }
    }
  );
};

// GET: Get all registered users
const getAllRegistrations = (req, res) => {
  const sql = `SELECT * FROM registrations ORDER BY created_at DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res.status(200).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
};

// DELETE: Delete registration by ID
const deleteRegistration = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM registrations WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Failed to delete registration" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json({ message: "Registration deleted successfully" });
  });
};

module.exports = { registerUser, getAllRegistrations, deleteRegistration };
