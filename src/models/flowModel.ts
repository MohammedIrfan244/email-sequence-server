import { ObjectId, Schema , model } from "mongoose";

interface IFlow {
  userId:ObjectId;
  name: string;
  leadListId: ObjectId;
  order : [{
    type: "email" | "delay";
    templateId?: ObjectId;
    delay?: number;
  }]
  createdAt?: Date;
  updatedAt?: Date;
}

const flowModel = new Schema<IFlow>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    leadListId: { type: Schema.Types.ObjectId, required: true, ref: "LeadList" },
    order : [{
      type: { type: String, enum: ["email", "delay"], required: true },
      templateId:{ type: Schema.Types.ObjectId, ref: "Template" },
      delay:{ type: Number }
    }]
  },
  { timestamps: true }
);

const Flow = model<IFlow>("Flow", flowModel);
export default Flow;