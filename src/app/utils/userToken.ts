import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../Config/env";
import { IsActive, IUser } from "../Modules/user/user.interface";
import { generate_token, verifyToken } from "./jwt";
import { User } from "../Modules/user/user.models";
import AppError from "../errorHelpers/AppError";
import { BAD_REQUEST } from "http-status-codes";



export const createUserToken = (data: Partial<IUser>) => {
    const user = {
        email: data.email,
        userId: data._id,
        role: data.role
    }

    const accessToken = generate_token(user, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);
    const refresh_token = generate_token(user, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES);


    return {
         accessToken,
         refresh_token
    }


}

export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {

    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload


    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email })

    if (!isUserExist) {
        throw new AppError( BAD_REQUEST, "User does not exist")
    }
    if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
        throw new AppError( BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }
    if (isUserExist.isDeleted) {
        throw new AppError(BAD_REQUEST, "User is deleted")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = generate_token(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    return accessToken
}

