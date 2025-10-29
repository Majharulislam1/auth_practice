import express, { Application,   Request, Response } from 'express'
import cors from 'cors'
 
import { router } from './app/routes';
 
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
 
import { NotFound } from './app/middlewares/NotFound';
import cookieParser from 'cookie-parser' 

export const app:Application = express();


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