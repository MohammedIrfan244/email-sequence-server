import { ObjectId, Schema , model } from "mongoose";


interface IFlowTrack {
  userId: ObjectId;
  leadId: ObjectId;
    flowId: ObjectId;
  currentOrder: number;
  status: "pending" | "completed" | "failed";
}

const flowTrackModel = new Schema<IFlowTrack>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    leadId: { type: Schema.Types.ObjectId, required: true, ref: "Lead" },
    flowId: { type: Schema.Types.ObjectId, required: true, ref: "Flow" },
    currentOrder: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  },
  { timestamps: true }
);

const FlowTrack = model<IFlowTrack>("FlowTrack", flowTrackModel);
export default FlowTrack;

