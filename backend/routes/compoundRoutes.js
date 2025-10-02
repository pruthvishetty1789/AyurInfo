import express from "express";
import { getCompounds, getCompoundById, createCompound } from "../controllers/compoundController.js";

const router = express.Router();

router.get("/", getCompounds);
router.get("/:id", getCompoundById);
router.post("/", createCompound);

export default router;
