import { CREATED } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespones";
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  
    const loginInfo = await authService.credentialsLoginService(req.body);

    console.log(loginInfo);

    sendResponse(res, {
        success: true,
        statusCode:  CREATED,
        message: "User Login Successfully",
        data: loginInfo,
    })
})



export const AuthControllers = {
     credentialsLogin
}
