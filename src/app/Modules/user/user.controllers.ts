import { Request, Response } from "express";
import { User } from "./user.models";
import {
    BAD_REQUEST,
    CREATED
} from 'http-status-codes';


const createUser = async (req: Request, res: Response) => {

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
        res.status(BAD_REQUEST).json({
            success: 'false',
            message: 'BAD REQUEST',
            error
        })
    }
}



export const UserControllers = {
    createUser
}