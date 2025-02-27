const express =require('express');
const dotenv=require("dotenv");
import { Request, Response, NextFunction } from "express";
const indexRouter =require("./routes/routes");
const {AppDataSource} =require('./data-source');
const cookieParser = require("cookie-parser");

dotenv.config();


const app=express();
app.use(cookieParser());
const PORT=process.env.PORT || 3000;
app.use('/',indexRouter);
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));

app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.json({msg:"sucess"});
})
AppDataSource.initialize()
.then(()=>{
    console.log('Database connection established successfully.');
}).catch(()=>{
    console.log('Failed to establish database connection.');
})

app.listen(PORT,()=>{
 console.log(`Application Running in port ${PORT}`);
 
})