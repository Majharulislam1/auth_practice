
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middlewares/validationRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

import { Role } from "./user.interface";
import { checkAuths } from "../../middlewares/checkAuths";
import { Router } from "express";



export const UserRoute = Router();


UserRoute.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser);
UserRoute.patch("/:id", validateRequest(updateUserZodSchema), checkAuths(...Object.values(Role)), UserControllers.updateUser)
UserRoute.get('/',checkAuths(Role.ADMIN,Role.SUPER_ADMIN) ,UserControllers.getAll_User);

