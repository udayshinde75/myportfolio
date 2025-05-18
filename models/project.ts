import mongoose, { Schema, Document } from "mongoose";

// Define a TypeScript interface for type safety
export interface IProject extends Document {
    _id: mongoose.Types.ObjectId;
    projectName: string;
    projectDescription: string;
    skills?: string[];
    githubLink?: string;
    liveDemo?: string;
    readmeFile: string;
    projectPictureUrl: string;
    user: mongoose.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>({
  projectName: {type:String, required:true},
  projectDescription: {type:String, required:true},
  skills: { type: [String], default: [] }, 
  githubLink: {type:String, required:false},
  liveDemo: {type:String, required:false},
  readmeFile: {type:String, required:true},
  projectPictureUrl: {type:String, required:true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export { Project };