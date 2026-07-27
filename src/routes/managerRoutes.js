const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const managerRoutes = require("./routes/managerRoutes");
const studentRoutes = require("./routes/studentRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/health", (req, res) => {
  res.json({ success: true, message: "MESS NOVA API is running" });
});
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal server error" });
});
module.exports = app;
