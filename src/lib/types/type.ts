import e, {Request} from 'express';

export interface AuthenticatedRequest<T = string> extends Request {
    user?: T;
} 

export interface LeadPayload  {
    name: string;
    email: string;
    company: string;
}