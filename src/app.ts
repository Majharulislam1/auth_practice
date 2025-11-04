import express, { Application,   Request, Response } from 'express'
import cors from 'cors'
 
import { router } from './app/routes';
 import expressSession from "express-session";
import passport from "passport";
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
 
import { NotFound } from './app/middlewares/NotFound';
import cookieParser from 'cookie-parser' 
import { envVars } from './app/Config/env';

import "../src/app/Config/passport";

export const app:Application = express();


app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use('/api/v1',router);


app.get('/',(req:Request,res:Response)=>{
     res.status(201).json({
         success:true,
         message:'Welcome to the auth practices'
     })
})


 
app.use(globalErrorHandler)
app.use(NotFound);