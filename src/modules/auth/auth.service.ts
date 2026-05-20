import { pool } from "../../db"
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken"
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
const accessToken= jwt.sign(jwtPayload,config.secret as string,{expiresIn:"1d"})
const refreshToken= jwt.sign(jwtPayload,"eorpfjsdjposdp",{expiresIn:"10d"})
return {accessToken,refreshToken}

}

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized access !!");
  }
  // second logic access token valid kina  . mane name ,id , email gula ver kora
  const decodedToken = jwt.verify(token, "eorpfjsdjposdp" ) as JwtPayload;

  //  user exist in database?
  const existUser = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [decodedToken.email],
  );

 

  if (existUser.rows.length == 0) {
    throw new Error("Unauthorized");
  }

  if (decodedToken.is_active == false) {
    throw new Error("Forbidden");
  }

  //   generate token
   const user = existUser.rows[0];

  const jwtPayload = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    is_active: user?.is_active,
  };
 
  const refreshToken = jwt.sign(jwtPayload,  config.secret as string, {
    expiresIn: "10d",
  });
  return {  refreshToken };
};


export const authService={
    postLoginIntoDb,
    generateRefreshToken,
}