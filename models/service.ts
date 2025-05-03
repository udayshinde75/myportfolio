import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    InfoForRecruiters: string;
    InfoForClients: string;
    Experience: string;
    user: mongoose.Types.ObjectId;
}

const ServiceSchema = new Schema<IService>({
    title: {type: String, required: true},
    InfoForRecruiters: {type: String, required: true},
    InfoForClients: {type: String, required: true},
    Experience: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps: true})

const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export { Service }