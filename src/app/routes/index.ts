import { Router } from "express";
import { UserRoute } from "../Modules/user/user.routes";

export const router = Router();


const moduleRoutes = [
     {
        path:"/user",
        route:UserRoute
     }
]


moduleRoutes.forEach((route)=>{
     router.use(route.path,route.route);
})