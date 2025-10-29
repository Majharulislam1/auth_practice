import { BAD_REQUEST, FORBIDDEN, NOT_FOUND } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.models";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../Config/env";
import bcryptjs from 'bcryptjs'


const createUser = async (payload: Partial<IUser>) => {
    const { email,password ,...rest } = payload;

    const isUserExist = await User.findOne({email});

    if(isUserExist){
         throw new AppError(BAD_REQUEST,"User Already Exist");
    }

    const hashPassword = await bcrypt.hash(password as string,10);

  

    const authProvider:IAuthProvider = {provider:'credentials',providerId:email as string};

    const user = await User.create({
        
        email,
        password:hashPassword,
        auths:[authProvider],
        ...rest
    })

    return user

}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(NOT_FOUND, "User Not Found")
    }

    /**
     * email - can not update
     * name, phone, password address
     * password - re hashing
     *  only admin superadmin - role, isDeleted...
     * 
     * promoting to superadmin - superadmin
     */

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(FORBIDDEN, "You are not authorized");
        }

        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError( FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError( FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser
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
    getAllUsers,
    updateUser
}