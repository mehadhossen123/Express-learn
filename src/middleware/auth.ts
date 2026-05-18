import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../db";

const auth=()=>{
    return async (req: Request, res: Response, next: NextFunction) => {
    //  console.log("this is headers : ",req.headers)
    const accessToken=req.headers.authorization;
    
//    first logic access token ase kina 
    if(!accessToken){
        return res.status(401).json({
            success:false,
            message:"Unauthorized access !!"
        })
    }
    // second logic access token valid kina  . mane name ,id , email gula ver kora 
    const decodedToken=jwt.verify(accessToken ,config.secret as string) as JwtPayload
   

    //  user exist in database? 
    const existUser=await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[decodedToken.email])

        if(existUser.rows.length==0){
             res.status(401).json({
               success: false,
               message: "User not found !!",
             });

        }

        if(decodedToken.is_active==false){
             res.status(401).json({
               success: false,
               message: "Forbidden!!",
             });
        }

        req.user=decodedToken;

    //  if get access token then call next function and get him data . 

      next();
    };

}

export default auth;