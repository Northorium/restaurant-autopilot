require("dotenv").config();
const express = require("express");
const path = require("path");
const {
  generateReviewResponse,
  generateWeekContent,
  generateSinglePost,
  restaurants,
} = require("./src/generator");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API: List restaurants
app.get("/api/restaurants", (req, res) => {
  const list = Object.entries(restaurants).map(([id, r]) => ({
    id,
    name: r.name,
    fullName: r.fullName,
    type: r.type,
    location: r.location,
  }));
  res.json(list);
});

// API: Generate review response
app.post("/api/review-response", async (req, res) => {
  try {
    const { restaurantId, rating, text, reviewerName } = req.body;

    if (!restaurantId || !rating || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await generateReviewResponse(restaurantId, {
      rating: parseInt(rating),
      text,
      reviewerName: reviewerName || "Guest",
    });

    res.json({ response });
  } catch (error) {
    console.error("Error generating review response:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: Generate week content
app.post("/api/week-content", async (req, res) => {
  try {
    const { restaurantId } = req.body;

    if (!restaurantId) {
      return res.status(400).json({ error: "Missing restaurantId" });
    }

    const content = await generateWeekContent(restaurantId);
    res.json({ content });
  } catch (error) {
    console.error("Error generating week content:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: Generate single post
app.post("/api/single-post", async (req, res) => {
  try {
    const { restaurantId, postType } = req.body;

    if (!restaurantId) {
      return res.status(400).json({ error: "Missing restaurantId" });
    }

    const content = await generateSinglePost(restaurantId, postType);
    res.json({ content });
  } catch (error) {
    console.error("Error generating post:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
🚀 Restaurant Autopilot running!

Open in browser: http://localhost:${PORT}

Available restaurants:
${Object.entries(restaurants)
  .map(([id, r]) => `  - ${id}: ${r.name}`)
  .join("\n")}
  `);
});
