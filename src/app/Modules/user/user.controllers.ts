import { NextFunction, Request, Response } from "express";

import {

    CREATED,
    OK
} from 'http-status-codes';
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespones";
 
import { JwtPayload } from "jsonwebtoken";
 


// const createUserFunction = async (req: Request, res: Response) => {
//      const { name, email } = req.body;
//     const user = await UserServices.createUser({ name, email });
//     res.status(CREATED).json({
//         success: 'true',
//         message: 'User created successfully',
//         user
//     })

// }



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserServices.createUser(req.body);


    sendResponse(res, {
        success: true,
        statusCode:  CREATED,
        message: "User Created Successfully",
        data: user,
    })
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET)  

    const verifiedToken = req.user;

    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "User Updated Successfully",
        data: user,
    })
})



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll_User = catchAsync( async(req: Request, res: Response, next: NextFunction)=>{
         const allUser = await UserServices.getAllUsers();

         sendResponse(res, {
        success: true,
        statusCode:OK,
        message: "All Users Retrieved Successfully",
        data: allUser.data,
        meta: allUser.meta
    })
})




export const UserControllers = {
    createUser,
    getAll_User,
    updateUser
}