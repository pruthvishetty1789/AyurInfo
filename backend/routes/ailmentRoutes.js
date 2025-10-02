import express from "express";
import Ailment from "../models/Ailment.js";

const router = express.Router();

// GET all unique ailments
router.get("/", async (req, res) => {
  try {
    const ailments = await Ailment.aggregate([
      // Group by ailmentName to remove duplicates
      { $group: { _id: "$ailmentName", doc: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$doc" } },
    ]);

    res.json(ailments);
  } catch (err) {
    console.error("Error fetching ailments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single ailment by ID
router.get("/:id", async (req, res) => {
  try {
    const ailment = await Ailment.findById(req.params.id);
    if (!ailment) return res.status(404).json({ message: "Ailment not found" });

    res.json(ailment);
  } catch (err) {
    console.error("Error fetching ailment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new ailment
router.post("/", async (req, res) => {
  try {
    const { ailmentName, description, commonSymptoms, recommendedPlants, recommendedCompounds } = req.body;

    const newAilment = new Ailment({
      ailmentName,
      description,
      commonSymptoms,
      recommendedPlants,
      recommendedCompounds,
    });

    const savedAilment = await newAilment.save();
    res.status(201).json(savedAilment);
  } catch (err) {
    console.error("Error creating ailment:", err);
    res.status(400).json({ message: "Could not create ailment" });
  }
});

export default router;
