import { Schema , model } from "mongoose";

interface ITemplate {
  userId: Schema.Types.ObjectId;
  name: string;
  subject: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const templateModel = new Schema<ITemplate>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Template = model<ITemplate>("Template", templateModel);
export default Template;