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

const allowedOrigins = [
  "http://localhost:5173",
  "https://bg-removal-lsufvf9pr-akashsingh062s-projects.vercel.app"
];

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
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