import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

connectDB()

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors({
    origin: 'https://blog-app-client-ks4w.onrender.com',
    credentials: true,  // Allow cookies and credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
    
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static('public'))
app.use(cookieParser())

app.get("/",(req,res) => {
    res.send("Deployed testing")
})

//importing user rotuers
import userRouter from "./routes/user.routes.js";
//importing blog router
import blogRouter from "./routes/blog.route.js";

app.use("/api/v1/user",userRouter)
app.use("/api/v1/blog",blogRouter)

app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`);
})
