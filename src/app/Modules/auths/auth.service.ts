import { BAD_REQUEST } from "http-status-codes";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.models";
import AppError from "../../errorHelpers/AppError";
import bcrypt from "bcryptjs";



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

    

    return {
        email:isUserExist.email
    }
    

    

}


export const authService = {
   credentialsLoginService
}