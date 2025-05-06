import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../lib/types/type";
import  jwt  from "jsonwebtoken";
import CustomError from "../lib/utils/CustomError";


const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            throw new CustomError("You are not authenticated",401);
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            throw new CustomError("You are not authenticated",401);
        }
        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
            if(err){
                throw new CustomError("Token is not valid",403);
            }
            const {userId} = user as {userId: string};
            req.user = userId;
            next();
        });
    }catch(error){
        next(new CustomError("You are not authenticated",401));
    }
}

export default verifyToken;