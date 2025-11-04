import { Response } from "express";

export interface AuthTokens {
    access_token?: string;
     refresh_token?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {

     console.log(tokenInfo);

    if (tokenInfo.access_token) {
        
        res.cookie("accessToken", tokenInfo.access_token, {
            httpOnly: true,
            secure: false
        })
    }

    if (tokenInfo. refresh_token) {
        
        res.cookie("refreshToken", tokenInfo. refresh_token, {
            httpOnly: true,
            secure: false,
        })
    }
}

