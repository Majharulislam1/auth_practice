import { NextFunction, Request, Response } from "express";
import { User } from "./user.models";
import {
  
    CREATED
} from 'http-status-codes';


const createUser = async (req: Request, res: Response,next:NextFunction) => {

    try {
        const { name, email } = req.body;
        console.log(req.body);
        const user = await User.create({ name, email });


        res.status(CREATED).json({
            success: 'true',
            message: 'User created successfully',
            user
        })
    } catch (error) {
        next(error);
    }
}



export const UserControllers = {
    createUser
}