import Compound from "../models/Compound.js";

// GET all compounds
export const getCompounds = async (req, res) => {
  try {
    const compounds = await Compound.find();
    res.json(compounds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single compound by ID
export const getCompoundById = async (req, res) => {
  try {
    const compound = await Compound.findById(req.params.id);
    if (!compound) return res.status(404).json({ message: "Compound not found" });
    res.json(compound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new compound
export const createCompound = async (req, res) => {
  try {
    const { compoundName, healingProperties } = req.body;
    const compound = new Compound({ compoundName, healingProperties });
    await compound.save();
    res.status(201).json(compound);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
