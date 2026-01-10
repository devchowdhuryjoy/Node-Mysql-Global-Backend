// const db = require("../config/db");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const SECRET_KEY = "your_secret_key"; 

// // Admin Login Controller
// const loginUser = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(400).json({ message: "Email and password required" });

//   // Admin only login
//   const sql = "SELECT * FROM users WHERE email = ?";
//   db.query(sql, [email], (err, results) => {
//     if (err) {
//       console.error("DB error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = results[0];

//     // Password check
//     const isMatch = bcrypt.compareSync(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Optional: only allow admin@example.com
//     const isAdmin = (user.email === "admin@site.com");

//     const token = jwt.sign(
//       { id: user.id, email: user.email, isAdmin },
//       SECRET_KEY,
//       { expiresIn: "24h" }
//     );

//     // Success response with message and token
//     res.json({
//       message: "Login successful",
//       token: token
//     });
//   });
// };

// module.exports = { loginUser };


const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JWT_SECRET; //

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isAdmin = user.email === "admin@site.com";

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  });
};

module.exports = { loginUser };
