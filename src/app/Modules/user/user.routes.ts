import { Router } from "express";
import { UserControllers } from "./user.controllers";


export const UserRoute = Router();

UserRoute.post('/register', UserControllers.createUser);
UserRoute.post('/', UserControllers.getAll_User);

