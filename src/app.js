const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const managerRoutes = require('./routes/managerRoutes');
const studentRoutes = require('./routes/studentRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const managerStudentRoutes = require("./routes/managerStudentRoutes");
const managerReportRoutes = require("./routes/managerReportRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'MESS NOVA API is running'
  });
});

// 404 Handler
<<<<<<< HEAD
// Routes
app.use("/api/auth", authRoutes);
=======
app.use('/api/auth', authRoutes);
app.use('/api/auth', studentRoutes);
app.use('/api/auth', managerRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
>>>>>>> e455aab301a8a6b466701760bd2ade5063605659

app.use("/api/student", studentRoutes);

app.use("/api/manager", managerRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/manager/students", managerStudentRoutes);

app.use("/api/manager/reports", managerReportRoutes);
app.use("/api/manager/analytics", analyticsRoutes);
app.use("/api/manager/notifications", notificationRoutes);
// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

module.exports = app;