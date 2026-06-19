import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import applicationRoutes from "./routes/applications.routes.js";



// Load environment variables from .env file
dotenv.config()

// Create an Express application
const app =express()



//cors for the both local frotend and vecel deployed frontend
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://intern-interview-delta.vercel.app"
  ]
}))


app.use(express.json())

app.use("/api/applications", applicationRoutes)



export default app;