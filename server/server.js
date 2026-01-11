import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./configs/mongodb";

// app config
const PORT = process.env.PORT || 4000
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// api routes
app.get('/',(req, res)=>{
    res.send("working")
})

app.listen(PORT, async()=>{
    await connectDB()
    console.log("app is running on port : ", PORT)
})