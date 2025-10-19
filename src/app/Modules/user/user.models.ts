import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";


const authProviderSchema = new Schema<IAuthProvider>({
     provider:{type:String,required:true},
     providerId:{type:String,required:true}
})

const userSchema = new Schema<IUser>({
      name:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      password:{type:String,default:'123456'},
      role:{
          type:String,
          enum:Object.values(Role),
          default:Role.USER
      },
      isActive:{
         type:String,
         enum:Object.values(IsActive),
         default:IsActive.ACTIVE
      }
      ,
      auths:[authProviderSchema]

},{
     timestamps:true,
     versionKey:false
})


export const User = model<IUser>("User",userSchema);