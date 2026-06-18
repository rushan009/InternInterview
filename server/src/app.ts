import express from "express"
import dotenv from "dotenv"
import applicationRoutes from "./routes/applications.routes";

dotenv.config()
const app =express()


app.use(express.json())

app.use("/api/applications", applicationRoutes)



export default app;