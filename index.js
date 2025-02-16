require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db");
const pollsRoutes = require("./routes/polls.route");

const app = express();

const corsOptions = {
  origin: "*", // Allow all origins (you can restrict this in production)
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/polls", pollsRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Initialize the database connection
initializeDatabase()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

module.exports = app;
