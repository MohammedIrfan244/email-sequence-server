import Template from "../../models/templateModel";
import CustomError from "../../lib/utils/CustomError";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../lib/types/type";
import { errorLogger } from "../../lib/utils/devLogger";


const createTemplate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {name,subject,body} = req.body;
    const userId = req.user;
    const template = await Template.findOne({ userId, name });
    if (template) {
        errorLogger("Template already exists");
        return next(new CustomError("Template already exists", 400));
    }
    await Template.create({ userId, name, subject, body });
    return res.status(201).json({ message: "Template created successfully" });
}


const deleteTemplate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user;
    const template = await Template.findOne({ _id: id, userId });
    if (!template) {
        errorLogger("Template not found");
        return next(new CustomError("Template not found", 404));
    }
    await Template.deleteOne({ _id: id, userId });
    return res.status(200).json({ message: "Template deleted successfully" });
}

const editTemplate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, subject, body } = req.body;
    const userId = req.user;
    const template = await Template.findOne({ _id: id, userId });
    if (!template) {
        errorLogger("Template not found");
        return next(new CustomError("Template not found", 404));
    }
    await Template.updateOne({ _id: id, userId }, { name, subject, body });
    return res.status(200).json({ message: "Template updated successfully" });
}

const getTemplates = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user;
    const templates = await Template.find({ userId }).sort({ createdAt: -1 });
    if (!templates) {
        errorLogger("No templates found");
        return next(new CustomError("No templates found", 404));
    }
    return res.status(200).json({ templates }); 
}


const getTemplate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user;
    const template = await Template.findOne({ _id: id, userId });
    if (!template) {
        errorLogger("Template not found");
        return next(new CustomError("Template not found", 404));
    }
    return res.status(200).json({ template });
}

export { createTemplate, deleteTemplate, editTemplate, getTemplates, getTemplate };
