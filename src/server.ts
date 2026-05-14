import express, { type Application, type Request, type Response } from "express";
import {Pool} from "pg";
const app:Application=express();
const port=5000;
// mddleware
app.use(express.json())

// connect postgresql with this server ;
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_YGKQk6MZVh1X@ep-dry-smoke-apz8nzlw-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

//  here we write the all api for whole project 
app.get("/",(req:Request,res:Response)=>{
   res.send("hello this is express server")
})

// her we have to learn post method 
app.post("/",async(req:Request,res:Response)=>{
    const data=req.body;
    res.status(200).json({
        message:"created",
        data:data
    })
})

app.listen(port,()=>{
    console.log(`the server is running on port ${port}`)
})