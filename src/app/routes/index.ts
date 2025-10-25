import { Router } from "express";
import { UserRoute } from "../Modules/user/user.routes";
import { AuthRouters } from "../Modules/auths/auth.routes";

export const router = Router();


const moduleRoutes = [
     {
        path:"/user",
        route:UserRoute
     },
     {
          path:"/auth",
          route:AuthRouters
     }
]


moduleRoutes.forEach((route)=>{
     router.use(route.path,route.route);
})