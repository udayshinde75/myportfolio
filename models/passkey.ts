import mongoose from "mongoose";

const PasskeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true }, // Unique passkey
    used: { type: Boolean, default: false } // Track usage
}, { timestamps: true });

export const Passkey = mongoose.models.Passkey || mongoose.model("Passkey", PasskeySchema);
