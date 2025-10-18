import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoute } from './app/Modules/user/user.routes';

export const app:Application = express();


app.use(cors());
app.use(express.json());

app.use('/api/v1/user/',UserRoute);


app.get('/',(req:Request,res:Response)=>{
     res.status(201).json({
         success:true,
         message:'Welcome to the auth practices'
     })
})