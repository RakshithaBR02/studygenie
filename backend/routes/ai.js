const express = require("express");
const { generateStudyMaterial } = require("../services/aiService");

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return res.status(400).json({
        error: "Please provide a valid study topic.",
      });
    }

    const studyData = await generateStudyMaterial(topic.trim());

    return res.status(200).json(studyData);
  } catch (error) {
    console.error("Study generation error:", error);

    return res.status(500).json({
      error: "Failed to generate study material. Please try again.",
    });
  }
});

module.exports = router;