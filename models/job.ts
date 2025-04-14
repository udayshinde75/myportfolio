import mongoose, { Schema, Document } from "mongoose";

// Define a TypeScript interface for type safety
export interface IJob extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    startDate: string;
    endDate: string;
    companyName: string;
    companyLink?: string;
    location: string;
    description?: string;
    skills?: string[];
    user: mongoose.Types.ObjectId;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true }, // e.g., "Software Engineer"
  startDate: { type: String, required: true }, // e.g., "April 2024"
  endDate: { type: String, default: "Present" },
  companyName: { type: String, required: true },
  companyLink: { type: String },
  location: {type: String},
  description: { type: String, default: "" },
  skills: { type: [String], default: [] }, // e.g., ["React.js", "MongoDB"]

  // Reference to user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Job = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);

export { Job };