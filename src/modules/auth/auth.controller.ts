import type { Request, Response } from "express";
import { authService } from "./auth.service";

const createLogin=async (req:Request,res:Response)=>{
    try {
        const result=await authService.postLoginIntoDb(req.body)
        const { refreshToken }=result;
        res.cookie("refreshToken",refreshToken,{
            secure:false,
            httpOnly:true,
            sameSite:'lax'
        })
         res.status(200).json({
           success: true,
           message: "User login successful",
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

const createRefreshToken=async(req:Request,res:Response)=>{

    try {
      const result = await authService.generateRefreshToken(
        req.cookies.refreshToken,
      );
      
      res.status(200).json({
        success: true,
        message: "Refresh token generated",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        error: error.detail,
      });
    }
}

export const authController={
    createLogin,
    createRefreshToken,
}
