import type { Request, Response } from "express";
import { authService } from "./auth.service";

const createLogin=async (req:Request,res:Response)=>{
    try {
        const result=await authService.postLoginIntoDb(req.body)
         res.status(200).json({
           success: true,
           message: "profile created successfully",
           data: result,
         });
        
    } 
    catch (error:any) {
        res.status(500).json({
          success: false,
          message: error.message,
          error: error.detail,
        });
        
    }
}

export const authController={
    createLogin,
}
