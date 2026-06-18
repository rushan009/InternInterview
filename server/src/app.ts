import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import applicationRoutes from "./routes/applications.routes.js";

dotenv.config()
const app =express()


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ]
}))


app.use(express.json())

app.use("/api/applications", applicationRoutes)



export default app;