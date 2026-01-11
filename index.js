// require("dotenv").config();
// const express = require("express");
// const db = require("./config/db");
// const cors = require("cors");
// const path = require("path");
// const registerRoute = require("./routes/registerRoute");
// const reviewRoute = require("./routes/reviewRoute");
// const reviewTwoRoute = require("./routes/reviewTwoRoute");
// const authRoute = require("./routes/authRoute");
// const videoRoute = require("./routes/videoRoute");
// const blogRoute = require("./routes/blogRoute");
// const nursingRoute = require("./routes/nursingRoute");
// const accountingRoute = require("./routes/accountingRoutes");
// const engineeringRoute = require("./routes/engineeringRoute");
// const foodHospitalityRoute = require("./routes/foodHospitalityRoute");
// const businessRoute = require("./routes/businessRoute");
// const collaborationRoutes = require("./routes/collaborationRoutes");
// const leadershipRoutes = require("./routes/leadershipRoutes");
// const countryRegisterRoutes = require("./routes/countryRegisterRoutes");
// const scholarshipRoutes = require("./routes/scholarshipRoutes");
// const visaSuccessRoutes = require("./routes/visaSuccessRoutes");




// const app = express();
// // const port = 3000;

// app.use(
//   cors({
//     // Allow requests from these origins
//     origin: ["http://localhost:5173", "http://localhost:30001"],
//     credentials: true,
//   })
// );
// app.use(express.json());
// // Serve static files from /uploads
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Use registration route
// app.use("/", registerRoute);
// app.use("/", reviewRoute);
// app.use("/", authRoute);
// app.use("/", videoRoute);
// app.use("/", blogRoute);
// app.use("/", reviewTwoRoute);
// app.use("/", nursingRoute);
// app.use("/", accountingRoute);
// app.use("/", engineeringRoute);
// app.use("/", foodHospitalityRoute);
// app.use("/", businessRoute);
// app.use("/", collaborationRoutes);
// app.use("/", leadershipRoutes);
// app.use("/", countryRegisterRoutes);
// app.use("/", scholarshipRoutes);
// app.use("/", visaSuccessRoutes);




// // app.listen(port, () => {
// //   console.log(`Server running on http://localhost:${port}`);
// // });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




// require("dotenv").config(); //

// const express = require("express");
// const db = require("./config/db");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://globalrouteway.com"
//     ],
//     credentials: true,
//   })
// );



// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // routes
// app.use("/api", require("./routes/registerRoute"));
// app.use("/api", require("./routes/reviewRoute"));
// app.use("/api", require("./routes/reviewTwoRoute"));
// app.use("/api", require("./routes/authRoute"));
// app.use("/api", require("./routes/videoRoute"));
// app.use("/api", require("./routes/blogRoute"));
// app.use("/api", require("./routes/nursingRoute"));
// app.use("/api", require("./routes/accountingRoutes"));
// app.use("/api", require("./routes/engineeringRoute"));
// app.use("/api", require("./routes/foodHospitalityRoute"));
// app.use("/api", require("./routes/businessRoute"));
// app.use("/api", require("./routes/collaborationRoutes"));
// app.use("/api", require("./routes/leadershipRoutes"));
// app.use("/api", require("./routes/countryRegisterRoutes"));
// app.use("/api", require("./routes/scholarshipRoutes"));
// app.use("/api", require("./routes/visaSuccessRoutes"));


// // React build serve 
// const buildPath = path.join(__dirname, "dist"); //"build"
// app.use(express.static(buildPath));

// // catch-all route: URL → React index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("Server running on port", port);
// });



require("dotenv").config();

const express = require("express");
const db = require("./config/db"); // Ensure this connects to your MySQL DB
const cors = require("cors");
const path = require("path");

const app = express();

// ===== CORS =====
app.use(
  cors({
    origin: [
      "http://localhost:5173",  // dev
      "https://globalrouteway.com" // production
    ],
    credentials: true,
  })
);

// ===== Body parsers =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Static files =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Backend API Routes =====
app.use("/api", require("./routes/registerRoute"));
app.use("/api", require("./routes/reviewRoute"));
app.use("/api", require("./routes/reviewTwoRoute"));
app.use("/api", require("./routes/authRoute"));
app.use("/api", require("./routes/videoRoute"));
app.use("/api", require("./routes/blogRoute"));
app.use("/api", require("./routes/nursingRoute"));
app.use("/api", require("./routes/accountingRoutes"));
app.use("/api", require("./routes/engineeringRoute"));
app.use("/api", require("./routes/foodHospitalityRoute"));
app.use("/api", require("./routes/businessRoute"));
app.use("/api", require("./routes/collaborationRoutes"));
app.use("/api", require("./routes/leadershipRoutes"));
app.use("/api", require("./routes/countryRegisterRoutes"));
app.use("/api", require("./routes/scholarshipRoutes"));
app.use("/api", require("./routes/visaSuccessRoutes"));

// ===== Serve React build =====
const buildFolder = "dist"; // Change to "build" if your React build folder is named 'build'
const buildPath = path.join(__dirname, buildFolder);
app.use(express.static(buildPath));

// ===== Catch-all route for React Router =====
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ===== Server start =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


