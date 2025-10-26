
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middlewares/validationRequest";
import { createUserZodSchema } from "./user.validation";

import { Role } from "./user.interface";
import { checkAuths } from "../../middlewares/checkAuths";
import { Router } from "express";



export const UserRoute = Router();


UserRoute.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser);
UserRoute.get('/',checkAuths(Role.ADMIN,Role.SUPER_ADMIN) ,UserControllers.getAll_User);

