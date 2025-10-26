import { envVars } from "../Config/env";
import { IAuthProvider, IUser, Role } from "../Modules/user/user.interface";
import { User } from "../Modules/user/user.models";
import bcryptjs from 'bcryptjs'


export const seedSuperAdmin = async()=>{
      try {

          console.log(envVars.SUPER_ADMIN_EMAIL);

           const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL })

        if (isSuperAdminExist) {
            console.log("Super Admin Already Exists!");
            return;
        }

        console.log("Trying to create Super Admin...");

        const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASS, Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload: IUser = {
            name: "Super admin",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
            auths: [authProvider]

        }

        const super_admin = await User.create(payload)
        console.log("Super Admin Created Successfully! \n");
        console.log(super_admin);
        
      } catch (error) {
         console.log(error);
      }
} 