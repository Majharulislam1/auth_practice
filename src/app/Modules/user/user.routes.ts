import { Router } from "express";
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middlewares/validationRequest";
import { createUserZodSchema } from "./user.validation";


export const UserRoute = Router();

UserRoute.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser);
UserRoute.get('/', UserControllers.getAll_User);

