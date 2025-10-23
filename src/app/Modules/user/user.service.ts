



import { BAD_REQUEST } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.models";
 

const createUser = async (payload: Partial<IUser>) => {
    const { email, ...rest } = payload;

    const isUserExist = await User.findOne({email});

    if(isUserExist){
         throw new AppError(BAD_REQUEST,"User Already Exist");
    }

    const authProvider:IAuthProvider = {provider:'credentials',providerId:email as string};

    const user = await User.create({
        
        email,
        auths:[authProvider],
        ...rest
    })

    return user

}

const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
};

export const UserServices = {
    createUser,
    getAllUsers
}