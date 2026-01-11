import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import { clerkWebhooks } from "./controllers/userController.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("working");
});

app.post(
    "/api/user/webhooks",
    express.raw({ type: "application/json" }),
    clerkWebhooks
);
app.use(express.json());
app.use("/api/user", userRouter);

app.listen(PORT, async () => {
    await connectDB();
    console.log("app is running on port:", PORT);
});