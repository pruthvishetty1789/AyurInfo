import mongoose from "mongoose";
const compoundSchema = new mongoose.Schema({
    compoundName:String,
    healingProperties:[String],
});
export default mongoose.model("Compound", compoundSchema);