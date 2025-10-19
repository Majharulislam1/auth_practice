import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
 
import { router } from './app/routes';
import { envVars } from './app/Config/env';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

export const app:Application = express();


app.use(cors());
app.use(express.json());

app.use('/api/v1',router);


app.get('/',(req:Request,res:Response)=>{
     res.status(201).json({
         success:true,
         message:'Welcome to the auth practices'
     })
})


 
app.use(globalErrorHandler)