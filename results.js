import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const RESULTS_FILE = path.resolve(
  process.cwd(),
  "data",
  "officialResults.json"
);

router.get("/", (req, res) => {
  try {
    const results = JSON.parse(
      fs.readFileSync(RESULTS_FILE, "utf8")
    );

    res.json(results);
  } catch (err) {
    res.status(500).json({
      error: "Failed to load results"
    });
  }
});

router.post("/", (req, res) => {
  try {
    const current = JSON.parse(
      fs.readFileSync(RESULTS_FILE, "utf8")
    );

    const updated = {
      ...current,
      ...req.body
    };

    fs.writeFileSync(
      RESULTS_FILE,
      JSON.stringify(updated, null, 2)
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

export default router;