const db = require("../config/db");

// GET: All blogs
const getAllBlogs = (req, res) => {
  const sql = "SELECT * FROM blogs ORDER BY date DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching blogs:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

// POST: New blog with image upload
const addBlog = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { slug, title, excerpt, author, date, tag } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!slug || !title || !excerpt || !author || !date || !tag || !image) {
    return res.status(400).json({ message: "All fields including image are required" });
  }

  const sql = `
    INSERT INTO blogs (slug, title, excerpt, image, author, date, tag)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [slug, title, excerpt, image, author, date, tag];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting blog:", err);
      return res.status(500).json({ message: "Insert failed" });
    }
    res.json({
      message: "Blog added successfully",
      blogId: result.insertId,
      image,
    });
  });
};

module.exports = { getAllBlogs, addBlog };
