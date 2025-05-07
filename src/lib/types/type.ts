import e, {Request} from 'express';
import { ObjectId } from 'mongoose';

export interface AuthenticatedRequest<T = string> extends Request {
    user?: T;
} 

export interface LeadPayload  {
    name: string;
    email: string;
    company: string;
}

export interface FlowLeadListPayload {
    _id: ObjectId;
    name: string;
}
    

