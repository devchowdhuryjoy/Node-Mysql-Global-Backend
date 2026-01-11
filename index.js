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




require("dotenv").config(); //

const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://globalrouteway.com"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/", require("./routes/registerRoute"));
app.use("/", require("./routes/reviewRoute"));
app.use("/", require("./routes/reviewTwoRoute"));
app.use("/", require("./routes/authRoute"));
app.use("/", require("./routes/videoRoute"));
app.use("/", require("./routes/blogRoute"));
app.use("/", require("./routes/nursingRoute"));
app.use("/", require("./routes/accountingRoutes"));
app.use("/", require("./routes/engineeringRoute"));
app.use("/", require("./routes/foodHospitalityRoute"));
app.use("/", require("./routes/businessRoute"));
app.use("/", require("./routes/collaborationRoutes"));
app.use("/", require("./routes/leadershipRoutes"));
app.use("/", require("./routes/countryRegisterRoutes"));
app.use("/", require("./routes/scholarshipRoutes"));
app.use("/", require("./routes/visaSuccessRoutes"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
