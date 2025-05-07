import { ObjectId, Schema, model } from "mongoose";

interface ILeadList {
  userId: ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}


const leadListModel = new Schema<ILeadList>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const LeadList = model<ILeadList>("LeadList", leadListModel);
export default LeadList;






