import mongoose from "mongoose";

const compoundSchema = new mongoose.Schema({
  compoundName: { type: String, required: true },
  healingProperties: [{ type: String }]
});

const Compound = mongoose.model("Compound", compoundSchema);

export default Compound;
