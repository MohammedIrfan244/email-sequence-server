import {Request} from 'express';

export interface AuthenticatedRequest<T = string> extends Request {
    user?: T;
} 