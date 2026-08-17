const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/ai");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "StudyGenie backend is running",
  });
});

app.listen(PORT, () => {
  console.log(`StudyGenie backend running on http://localhost:${PORT}`);
});