import { BAD_REQUEST } from "http-status-codes";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.models";
import AppError from "../../errorHelpers/AppError";
import bcrypt from "bcryptjs";
 
import { generate_token } from "../../utils/jwt";
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

    const user = {
         email:isUserExist.email,
         userId : isUserExist.id,
         role:isUserExist.role
    }

    const token = generate_token(user,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES);

    return {
         token
    }
    

    

}


export const authService = {
   credentialsLoginService
}