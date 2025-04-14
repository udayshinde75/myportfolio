import mongoose, { Schema, Document } from "mongoose";

// Define a TypeScript interface for type safety
export interface IEducation extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    startDate: string;
    endDate: string;
    universityName: string;
    universityIcon: string;
    universityLink?: string;
    location:string;
    description: string;
    skills?: string[];
    proof?:string;
    score:string;
    scoreType:string;
    user: mongoose.Types.ObjectId;
}

const EducationSchema = new Schema<IEducation>({
  title: { type: String, required: true }, 
  startDate: { type: String, required: true }, 
  endDate: { type: String, default: "Present" },
  universityName: { type: String, required: true },
  universityIcon: { type: String, required:true },
  universityLink: {type: String},
  location: {type: String, required: true},
  description: { type: String, required: true },
  skills: { type: [String], default: [] }, 
  proof: {type: String},
  score: {type: String, required:true},
  scoreType:{
    type: String,
    enum: ["CGPA", "Percentage", "Grade"],
    default:"CGPA",
    required: true
  },
  // Reference to user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Education = mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);

export { Education };