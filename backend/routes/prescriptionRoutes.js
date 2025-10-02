import express from "express";
import Prescription from "../models/Prescription.js";

const router = express.Router();

// GET all prescriptions
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (err) {
    console.error("Error fetching prescriptions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET a single prescription by ID
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) return res.status(404).json({ message: "Prescription not found" });
    res.json(prescription);
  } catch (err) {
    console.error("Error fetching prescription:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new prescription
router.post("/", async (req, res) => {
  try {
    const { dosage, consumingMethod, courseDuration } = req.body;

    const newPrescription = new Prescription({ dosage, consumingMethod, courseDuration });
    const savedPrescription = await newPrescription.save();

    res.status(201).json(savedPrescription);
  } catch (err) {
    console.error("Error creating prescription:", err);
    res.status(400).json({ message: "Could not create prescription" });
  }
});

// PUT update a prescription
router.put("/:id", async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPrescription) return res.status(404).json({ message: "Prescription not found" });
    res.json(updatedPrescription);
  } catch (err) {
    console.error("Error updating prescription:", err);
    res.status(400).json({ message: "Could not update prescription" });
  }
});

// DELETE a prescription
router.delete("/:id", async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!deletedPrescription) return res.status(404).json({ message: "Prescription not found" });
    res.json({ message: "Prescription deleted successfully" });
  } catch (err) {
    console.error("Error deleting prescription:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
