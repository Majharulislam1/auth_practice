/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BAD_REQUEST, UNAUTHORIZED } from "http-status-codes";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.models";
import AppError from "../../errorHelpers/AppError";
import bcrypt from "bcryptjs";

 
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../Config/env";


const credentialsLoginService =  async (payload: Partial<IUser>) => {
    const { email,password } = payload;

    

    const isUserExist = await User.findOne({email});

    

    if(!isUserExist){
         throw new AppError(BAD_REQUEST,"Email doesn't exist");
    }

    const isPasswordMatch = await bcrypt.compare(password as string,isUserExist.password as string);

    if(!isPasswordMatch){
          
         throw new AppError(BAD_REQUEST,"Incorrect Password");
     
    }

//     const user = {
//          email:isUserExist.email,
//          userId : isUserExist.id,
//          role:isUserExist.role
//     }

    const token = createUserToken(isUserExist);
   


    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password:pass , ...rest} = isUserExist.toObject();

    return {
         access_token:token.accessToken,
         refresh_token:token.refresh_token,
         user:rest
    }
    

    

}


const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)
    console.log(decodedToken.userId);
    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user!.password as string)
    if (!isOldPasswordMatch) {
        throw new AppError(UNAUTHORIZED, "Old Password does not match");
    }

    user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save();


}


const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}




export const authService = {
   credentialsLoginService,
   getNewAccessToken,
   resetPassword
}