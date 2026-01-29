const express = require("express");
const cors = require("cors");

// Import database connection
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* Middleware */
app.use(express.json());
app.use(cors());

/* Database */
connectDB();

/* API Routes */
app.use("/api", authRoutes);

/* Serve Dashboard */
app.use(express.static(path.join(__dirname, "public")));

/* Default route */
app.get("/", (req, res) => {
  res.send("🚚 Cargo Protection System Backend is Running");
});

/* Port for Render */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
