// import mongoose from "mongoose";
// const ailmentSchema = new mongoose.Schema({
//     ailmentName:String,
//     symptoms:[String],
// });
// export default mongoose.model("Ailment", ailmentSchema);
import mongoose from "mongoose";

const ailmentSchema = new mongoose.Schema({
  ailmentName: { type: String, required: true },
  description: { type: String },
  commonSymptoms: [{ type: String }],
  recommendedPlants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plant" }],
  recommendedCompounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Compound" }]
});

const Ailment = mongoose.model("Ailment", ailmentSchema);

export default Ailment;
