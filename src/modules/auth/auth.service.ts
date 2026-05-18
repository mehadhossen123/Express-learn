import { pool } from "../../db"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "../../config";

const postLoginIntoDb=async(payload:{
    email:string,
    password:string
})=>{
    const {email,password}=payload;
    const userData=await pool.query(`
        SELECT*FROM users WHERE email=$1
        `,[email])
        if(userData.rows.length==0){
            throw new Error ("Invalid credentials")
        }


    

    const user=userData.rows[0]
    const matchPassword = await bcrypt.compare(password,user.password);
    if(!matchPassword){
        throw new Error ("Invalid credentials");
    }
//   generate token 

const jwtPayload={
    id:user?.id,
    name:user?.name,
    email:user?.email,
    role:user?.role,
    is_active:user?.is_active

}
const jwtToken=await jwt.sign(jwtPayload,config.secret as string,{expiresIn:"1d"})
return {jwtToken}

}


export const authService={
    postLoginIntoDb,
}