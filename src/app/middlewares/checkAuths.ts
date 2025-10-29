import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../Config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuths = (...authRoles : string[])=> (req: Request, res: Response, next: NextFunction)=>{
        

      try {
          const accessToken = req.headers.authorization;

       if(!accessToken){
            throw new AppError(403,"No Token Received");
       }

       const verifiedToken = verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload;

       

      if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }

      req.user = verifyToken;

     next();
      } catch (error) {
         next(error);
      }

}