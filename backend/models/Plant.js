import mongoose from "mongoose";
const plantSchema = new mongoose.Schema({
    scientificName: { type: String, required: true, unique: true },
    commonName: String,
    regionalNames: [String],
    plantPartUsed: [String],
    habitat: String,
    season: String,
    imageUrl: String,
    description: String,
    healingProperties: [String],
    compounds: [String],
    ailments: [String],
    prescriptions: [String],
}, { timestamps: true });
export default mongoose.model("Plant", plantSchema);