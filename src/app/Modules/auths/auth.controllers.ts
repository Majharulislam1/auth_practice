import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespones";
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import AppError from "../../errorHelpers/AppError";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  
    const loginInfo = await authService.credentialsLoginService(req.body);
     
    res.cookie("accessToken", loginInfo.access_token, {
        httpOnly: true,
        secure: false
    })


    res.cookie("refreshToken", loginInfo.refresh_token, {
        httpOnly: true,
        secure: false,
    })




    sendResponse(res, {
        success: true,
        statusCode:  CREATED,
        message: "User Login Successfully",
        data: loginInfo,
    })
})



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(BAD_REQUEST, "No refresh token recieved from cookies")
    }
    const tokenInfo = await authService.getNewAccessToken(refreshToken as string)

    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: false
    })

  

    sendResponse(res, {
        success: true,
        statusCode:  OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
})





export const AuthControllers = {
     credentialsLogin,
     getNewAccessToken
}
