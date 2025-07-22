const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const registerRoute = require("./routes/registerRoute");
const reviewRoute = require("./routes/reviewRoute");
const authRoute = require("./routes/authRoute");
const videoRoute = require('./routes/videoRoute');
const blogRoute = require("./routes/blogRoute");


const app = express();
const port = 3000;

app.use(
  cors({
    // ✅ Allow requests from these origins
    origin: ["http://localhost:5173", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
// ✅ Serve static files from /uploads
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Use registration route
app.use("/", registerRoute);
app.use("/", reviewRoute);
app.use("/", authRoute);
app.use("/", videoRoute);
app.use("/", blogRoute);




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
