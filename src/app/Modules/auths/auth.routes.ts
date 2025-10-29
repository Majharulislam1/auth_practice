import { Router } from "express";
import { AuthControllers } from "./auth.controllers";


export const AuthRouters = Router();

AuthRouters.post('/login', AuthControllers.credentialsLogin);
AuthRouters.post("/refresh-token", AuthControllers.getNewAccessToken)
