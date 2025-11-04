import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controllers";
import { checkAuths } from "../../middlewares/checkAuths";
import { Role } from "../user/user.interface";
import passport from "passport";


export const AuthRouters = Router();

AuthRouters.post('/login', AuthControllers.credentialsLogin);
AuthRouters.post("/refresh-token", AuthControllers.getNewAccessToken);
AuthRouters.post("/logout",AuthControllers.logout);
AuthRouters.post("/reset-password", checkAuths(...Object.values(Role)), AuthControllers.resetPassword)

//  /booking -> /login -> succesful google login -> /booking frontend
// /login -> succesful google login -> / frontend
AuthRouters.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})

// api/v1/auth/google/callback?state=/booking
AuthRouters.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), AuthControllers.googleCallbackController)