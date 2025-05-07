import { ObjectId, Schema , model } from "mongoose";

interface ITemplate {
  userId:ObjectId;
  name: string;
  order : [{
    type: "email" | "delay";
    templateId?: ObjectId;
    delay?: number;
  }]
  createdAt?: Date;
  updatedAt?: Date;
}

const flowModel = new Schema<ITemplate>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    order : [{
      type: String,
      templateId:{ type: Schema.Types.ObjectId, ref: "Template" },
      delay:{ type: Number }
    }]
  },
  { timestamps: true }
);