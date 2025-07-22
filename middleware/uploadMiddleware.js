const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, filename);
  },
});

// File filter: only allow image types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed!"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
