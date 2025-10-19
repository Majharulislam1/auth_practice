import { NextFunction, Request, Response } from "express";

import {

    CREATED
} from 'http-status-codes';
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
 


// const createUserFunction = async (req: Request, res: Response) => {
//      const { name, email } = req.body;
//     const user = await UserServices.createUser({ name, email });
//     res.status(CREATED).json({
//         success: 'true',
//         message: 'User created successfully',
//         user
//     })

// }



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserServices.createUser(req.body);


    res.status(CREATED).json({
        success: 'true',
        message: 'User created successfully',
        user
    })

})


const getAll_User = catchAsync( async(req: Request, res: Response, next: NextFunction)=>{
         const allUser = await UserServices.getAllUsers();

         res.status(CREATED).json({
        success: 'true',
        message: 'All User',
        data:allUser
    })
})




export const UserControllers = {
    createUser,
    getAll_User
}