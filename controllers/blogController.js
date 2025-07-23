
const db = require("../config/db");

// GET: All blogs (for blog listing page)
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

// GET: Single blog by slug (for blog details page)
const getBlogBySlug = (req, res) => {
  const { slug } = req.params;
  const sql = "SELECT * FROM blogs WHERE slug = ?";
  
  db.query(sql, [slug], (err, results) => {
    if (err) {
      console.error("Error fetching blog:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(results[0]);
  });
};

// POST: New blog with image upload
const addBlog = (req, res) => {
  const { slug, title, excerpt, author, date, tag, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!slug || !title || !excerpt || !author || !date || !tag || !image || !content) {
    return res.status(400).json({ message: "All fields including image are required" });
  }

  const sql = `
    INSERT INTO blogs (slug, title, excerpt, image, author, date, tag, content)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [slug, title, excerpt, image, author, date, tag, content];

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





module.exports = { getAllBlogs, getBlogBySlug, addBlog,  };