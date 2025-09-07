import express from "express";
import Plant from "../models/Plant.js";

const router = express.Router();

//Get all plants
router.get("/", async (req, res) => {
    try {
        const plants=await Plant.find().select("commonName scientificName imageUrl healingProperties description").limit(50);
        res.json(plants);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

//Get plant by ID(with compound and ailment populated)
router.get("/id/:_id", async (req, res) => {
    try {
        const plant = await Plant.findById(req.params._id)
        .populate("compounds")
        .populate("ailments")
        .populate("prescriptions");
        if (!plant) 
            return res.status(404).json({ message: "Plant not found" });
        res.json(plant);    
        }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
export default router;