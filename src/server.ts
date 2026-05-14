import express, { type Application, type Request, type Response } from "express";
const app:Application=express();
const port=5000;
app.use(express.json())
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