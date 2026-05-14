import express from "express";
const app=express();
const port=5000;
app.get("/",(req,res)=>{
   res.send("hello this is express server")
})

app.listen(port,()=>{
    console.log(`the server is running on port ${port}`)
})