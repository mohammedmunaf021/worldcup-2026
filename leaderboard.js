import { Router } from "express";
import { db } from "../db.js";
import fs from "fs";
import path from "path";
import { calculateScore } from "../utils/calculateScore.js";

const router = Router();

const RESULTS_FILE = path.resolve(
  process.cwd(),
  "data",
  "officialResults.json"
);

router.get("/", (req, res) => {
  const all = db.get("predictions").value() || [];

  const actualResults = JSON.parse(
    fs.readFileSync(RESULTS_FILE, "utf8")
  );

  const leaderboard = all.map((entry) => {
    const points = calculateScore(
      entry.picks,
      actualResults
    );

    return {
      name: entry.name,
      points,
      updatedAt: entry.updatedAt,
    };
  });

  leaderboard.sort(
    (a, b) =>
      b.points - a.points ||
      new Date(a.updatedAt) -
        new Date(b.updatedAt)
  );

  res.json({
    leaderboard
  });
});

export default router;