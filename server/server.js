import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

// app config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// middlewares
app.use(express.json());

app.use(
  cors()
);

// api routes
app.get('/', (req, res) => {
    res.send("working")
})
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.listen(PORT, async () => {
    console.log("app is running on port : ", PORT)
})