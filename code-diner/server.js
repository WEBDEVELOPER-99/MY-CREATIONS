const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "languages.json"), "utf-8"));

app.get("/api/levels", (req, res) => {
  res.json(data);
});

app.post("/api/check", (req, res) => {
  const { userAnswer, correctAnswer } = req.body;
  res.json({ correct: userAnswer.trim() === correctAnswer.trim() });
});

app.listen(3000, () => {
  console.log("🍽 Code Diner running on http://localhost:3000");
});
