import mongoose from "mongoose";
const prescriptionSchema = new mongoose.Schema({
    dosage:String,
    consumingMethod:String,
    courseDuration:String,
});
export default mongoose.model("Prescription", prescriptionSchema);