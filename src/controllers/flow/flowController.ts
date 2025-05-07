import Flow from "../../models/flowModel";
import Lead from "../../models/leadModel";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../lib/types/type";
import { errorLogger } from "../../lib/utils/devLogger";
import CustomError from "../../lib/utils/CustomError";
import agenda from "../../configs/agenda";
import { FlowLeadListPayload } from "../../lib/types/type";

const createFlow = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, leadListId, order } = req.body;
  const userId = req.user;

  const flow = await Flow.findOne({ userId, name });
  if (flow) {
    errorLogger("Flow already exists");
    return next(new CustomError("Flow already exists", 400));
  }

  const newFlow = await Flow.create({ userId, name, leadListId, order });

  const leads = await Lead.find({ listId: leadListId });
  if (leads.length == 0) {
    errorLogger("No leads found in the list");
    return next(new CustomError("No leads found in the list", 404));
  }

  for (const lead of leads) {
    let delay = 0;

    for (const step of order) {
      if (step.type === "email") {
        delay += step.delay || 0;

        await agenda.schedule(
          new Date(Date.now() + delay *1000),
          "send email",
          {
            leadId: lead._id,
            templateId: step.templateId,
            flowId: newFlow._id,
          }
        );
      } else if (step.type === "delay") {
        delay += step.delay;
      }
    }
  }
    return res.status(201).json({ message: "Flow created successfully" });
};


 const deleteFlow = async (
  req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const userId = req.user;
    const flow = await Flow.findOne({ _id: id, userId });
    if (!flow) {
        errorLogger("Flow not found");
        return next(new CustomError("Flow not found", 404));
    }
    await Flow.deleteOne({ _id: id, userId });
    return res.status(200).json({ message: "Flow deleted successfully" });
}

const getUserFlows = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user;
  const flows = await Flow.find({ userId }).populate("leadListId", "name");
  if (!flows) {
    errorLogger("No flows found");
    return next(new CustomError("No flows found", 404));
  }
  const formattedFlows = flows.map((flow) => {
    return {
      id: flow._id,
      name: flow.name,
      source: (flow.leadListId as FlowLeadListPayload).name,
      createdAt: flow.createdAt,
    }
  })
  return res.status(200).json({ message: "Flows fetched successfully", flows: formattedFlows });
}

const getFlowById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.user;
  const flow = await Flow.findOne({ _id: id, userId })
      .populate({ path: "leadListId", select: "name" })
      .populate({ path: "order.templateId", select: "name" });
      
  if (!flow) {
    errorLogger("Flow not found");
    return next(new CustomError("Flow not found", 404));
  }
  return res.status(200).json({ message: "Flow fetched successfully", flow });
}

export {createFlow , deleteFlow , getUserFlows , getFlowById}