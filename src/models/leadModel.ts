import { ObjectId, Schema, model } from "mongoose";

interface ILead {
  userId: ObjectId;
  name: string;
  email: string;
  company: string;
  listId : ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const leadModel = new Schema<ILead>(
  {
    userId: { type: Schema.Types.ObjectId , required: true ,ref: "User" },
    name: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    company: { type: String, required: true },
    listId: { type: Schema.Types.ObjectId , required: true ,ref: "LeadList" },
  },
  { timestamps: true }
);

const Lead = model<ILead>("Lead", leadModel);
export default Lead;
