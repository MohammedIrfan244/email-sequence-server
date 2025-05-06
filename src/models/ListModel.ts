import mongoose, { Schema, model } from "mongoose";

interface IList {
  name: string;
  leadId: Schema.Types.ObjectId[];
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const listModel = new Schema<IList>(
  {
    name: { type: String, required: true },
    leadId: [{ type: Schema.Types.ObjectId, ref: "Lead" }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const List = model<IList>("List", listModel);
export default List;


