// models/GeneratedPlan.js
import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true }, // Keep as string if you're using ₹ symbol
  description: { type: String },
  features: [{ type: String }]
});

const generatedPlanSetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    businessName: { type: String }, // Optional: If you want to store form details
    createdAt: { type: Date, default: Date.now },
    plans: [planSchema] // This stores all the plans (Basic, Standard, Premium)
  },
  { timestamps: true }
);

export default mongoose.models.GeneratedPlanSet || mongoose.model("GeneratedPlanSet", generatedPlanSetSchema);
