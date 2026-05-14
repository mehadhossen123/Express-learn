import express, { type Application, type Request, type Response } from "express";
import {Pool} from "pg";
const app:Application=express();
const port=5000;
// middleware
app.use(express.json())

// connect postgresql with this server ;
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_YGKQk6MZVh1X@ep-dry-smoke-apz8nzlw-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB=async ()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY ,
            name VARCHAR(20),
            email VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            age INT ,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

            )
            `)
            console.log("database connected successfully",initDB)
           

    }
    catch(error){
        console.log(error);
    }

}
 initDB();

//  here we write the all api for whole project 
app.get("/",(req:Request,res:Response)=>{
   res.send("hello this is express server")
})

// her we have to learn post method 
app.post("/",async(req:Request,res:Response)=>{
   try{
     const {name,email,password,age}=req.body;
    const result=await pool.query(`
        INSERT INTO users(name,email,password,age) 
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,[name,email,password,age])
        // console.log(result)
    res.status(200).json({
        message:"created",
        data:result.rows[0]
    })
    
   }catch(error:any){
     res.status(200).json({
       message:error.message,
       error:error.detail,
     });

   }
})

app.listen(port,()=>{
    console.log(`the server is running on port ${port}`)
})