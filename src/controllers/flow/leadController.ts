import Lead from "../../models/leadModel";
import LeadList from "../../models/leadListModel";
import { Response , NextFunction } from "express";
import { AuthenticatedRequest, LeadPayload } from "../../lib/types/type";
import { errorLogger } from "../../lib/utils/devLogger";
import CustomError from "../../lib/utils/CustomError";


const createList = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const  userId = req.user;
    const list = await LeadList.findOne({ userId, name });
    if (list) {
        errorLogger("List already exists");
        return next(new CustomError("List already exists", 400));
    }
     await LeadList.create({ userId, name });
    return res.status(201).json({ message: "List created successfully" });
}

const deleteList = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user;
    const list = await LeadList.findOne({ _id: id, userId });
    if (!list) {
        errorLogger("List not found");
        return next(new CustomError("List not found", 404));
    }
    await LeadList.deleteOne({ _id: id, userId });
    await Lead.deleteMany({ listId: id });
    return res.status(200).json({ message: "List deleted successfully" });
}

const addLead = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const {leads, listId} = req.body;
    const userId = req.user;
    const list = await LeadList.findOne({ _id: listId, userId });
    if (!list) {
        errorLogger("List not found");
        return next(new CustomError("List not found", 404));
    }
    await Lead.insertMany(leads.map((lead: LeadPayload ) => ({ ...lead, userId, listId })), { ordered: false });
    return res.status(201).json({ message: "Leads added successfully"});
    }catch(error : any){
        if (error.code === 11000) {
            errorLogger("Duplicate lead found");
            return res.status(201).json({ message: "Lead added while skipping duplicates" });
        } else {
            errorLogger("Error adding leads: " + error.message);
            return next(new CustomError("Error adding leads", 500));
        }
    }
}

const removeLead = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user;
    const lead = await Lead.findOne({ _id: id, userId });
    if (!lead) {
        errorLogger("Lead not found");
        return next(new CustomError("Lead not found", 404));
    }
    await Lead.deleteOne({ _id: id, userId });
    return res.status(200).json({ message: "Lead deleted successfully" });
}

const getAllList = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user;
    const lists = await LeadList.find({ userId } , { name: 1, createdAt: 1, updatedAt: 1 });
    if (!lists) {
        errorLogger("No lists found");
        return next(new CustomError("No lists found", 404));
    }
    return res.status(200).json({ message: "Lists fetched successfully", lists });
}

const getListById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user;
    const list = await LeadList.findOne({ _id: id, userId });
    if (!list) {
        errorLogger("List not found");
        return next(new CustomError("List not found", 404));
    }
    const leads = await Lead.find({ listId: id, userId });
    return res.status(200).json({ message: "List fetched successfully", list, leads });
}

export { createList, deleteList, addLead, removeLead , getAllList, getListById };