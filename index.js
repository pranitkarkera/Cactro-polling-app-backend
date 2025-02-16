require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db");
const app = express();
const pollsRoutes = require("./routes/polls.route");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/polls", pollsRoutes);

initializeDatabase()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
