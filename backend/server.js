import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import plantsRoutes from "./routes/plantRoutes.js";
import compoundRoutes from "./routes/compoundRoutes.js";
import ailmentRoutes from "./routes/ailmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
   dbName: "ayurinfo"
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend with MongoDB is running 🚀");
});

// Example API route
app.use("/api/plants",plantsRoutes);
app.use("/api/compounds",compoundRoutes)
app.use("/api/ailments", ailmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
