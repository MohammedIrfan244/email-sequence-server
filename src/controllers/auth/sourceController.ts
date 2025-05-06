import List from "../../models/ListModel";
import { NextFunction, Response } from "express";
import CustomError from "../../lib/utils/CustomError";
import { AuthenticatedRequest } from "../../lib/types/type";


const createList = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { listName, leads } = req.body;
    const userId = req.user
    const list = new List({
        name: listName,
        leads: leads,
        user: userId,
    });
    await list.save()
    res.status(201).json({
        success: true,message: "List created successfully"})
}

const addLeadToList = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { listId, lead } = req.body;
    const userId = req.user
    const list = await List.findById(listId);
    if (!list) {
        return next(new CustomError("List not found", 404));
    }
    if (list.user.toString() !== userId) {
        return next(new CustomError("Not authorized to add lead to this list", 403));
    }
    list.leads.push(lead);
    await list.save();
    res.status(200).json({ success: true, message: "Lead added to list successfully" });
}

const removeLeadFromList = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { listId , lead } = req.body;
    const userId = req.user
    const list = await List.findById(listId);
    if (!list) {
        return next(new CustomError("List not found", 404));
    }
    if (list.user.toString() !== userId) {
        return next(new CustomError("Not authorized to remove lead from this list", 403));
    }
    list.leads = list.leads.filter((l) => l.email !== lead.email && l.name !== lead.name && l.company !== lead.company);
    await list.save();
    res.status(200).json({ success: true, message: "Lead removed from list successfully" });
}

const getLists = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user
    const lists = await List.find({ user: userId } , { leads: 0 })
    res.status(200).json({ success: true, lists });
}

const getListById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { listId } = req.params;
    const userId = req.user
    const list = await List.findById(listId);
    if (!list) {
        return next(new CustomError("List not found", 404));
    }
    if (list.user.toString() !== userId) {
        return next(new CustomError("Not authorized to access this list", 403));
    }
    res.status(200).json({ success: true, list });
}






export { createList, addLeadToList, removeLeadFromList, getLists , getListById };