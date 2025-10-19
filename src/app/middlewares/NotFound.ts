import { Request, Response } from "express"
import { NOT_FOUND } from "http-status-codes"


export const NotFound = (req:Request,res:Response)=>{
    
     res.status(NOT_FOUND).json({
          success:false,
          message: "Route Not Found"
     })

}