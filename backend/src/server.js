require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const instructorRoutes = require("./routes/instructor");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/instructor", instructorRoutes);

// Default
app.get("/", (req, res) => res.send("🚀 Nimbus Backend Running"));

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
