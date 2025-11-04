import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespones";
import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import {   AuthTokens, setAuthCookie } from "../../utils/setCookies";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../Config/env";
import { createUserToken } from "../../utils/userToken";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  
    const loginInfo = await authService.credentialsLoginService(req.body);
     
    // res.cookie("accessToken", loginInfo.access_token, {
    //     httpOnly: true,
    //     secure: false
    // })


    // res.cookie("refreshToken", loginInfo.refresh_token, {
    //     httpOnly: true,
    //     secure: false,
    // })

 setAuthCookie(res, loginInfo);


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

    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

  setAuthCookie(res, tokenInfo as AuthTokens)

    sendResponse(res, {
        success: true,
        statusCode:  OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "User Logged Out Successfully",
        data: null,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user
    console.log( decodedToken);
    await authService.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Password Changed Successfully",
        data: null,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    // /booking => booking , => "/" => ""
    const user = req.user;

    if (!user) {
        throw new AppError(NOT_FOUND, "User Not Found")
    }

    const tokenInfo = createUserToken(user)

    setAuthCookie(res, tokenInfo)

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})



export const AuthControllers = {
     credentialsLogin,
     getNewAccessToken,
     logout,
     resetPassword,
     googleCallbackController

}
