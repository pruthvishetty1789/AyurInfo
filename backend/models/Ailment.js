import mongoose from "mongoose";
const ailmentSchema = new mongoose.Schema({
    ailmentName:String,
    symptoms:[String],
});
export default mongoose.model("Ailment", ailmentSchema);