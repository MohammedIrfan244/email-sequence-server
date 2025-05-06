import {Schema,model} from "mongoose";


interface ILead{
    name:string,
    email:string,
    company:string,
    listId:Schema.Types.ObjectId[]
}

const leadModel = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    listId:[{ type: Schema.Types.ObjectId, ref: "List" }],
  },
  { timestamps: true }
);


const Lead = model<ILead>("Lead", leadModel);
export default Lead;

