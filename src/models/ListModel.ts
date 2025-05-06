import mongoose, { Schema, model } from "mongoose";

interface ILead {
  name: string;
  email: string;
  company: string;
}
interface IList {
  name: string;
  leads: ILead[];
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const listModel = new Schema<IList>(
  {
    name: { type: String, required: true },
    leads: [{type:Object}],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const List = model<IList>("List", listModel);
export default List;
