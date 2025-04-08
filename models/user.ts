import mongoose, { Schema, Document } from "mongoose";

// Define a TypeScript interface for type safety
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    profilePicture?: string;
    resumeLink?: string;
    bio?: string;
}

// Create the schema
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    resumeLink: {
        type: String,
        default: ""
    },
    bio : {
        type : String,
        default : ""
    }
});

// Export the model only if it hasn’t been defined before
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export { User };
