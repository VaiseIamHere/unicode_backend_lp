import express from "express"
import crudRoute from "./routes/crudRoutes.js"
import serviceRoute from "./routes/serviceRoutes.js"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import morgan from "morgan"
import connectDB from "./connectDB.js"

dotenv.config()

const app = express()

const accessLogStream = fs.createWriteStream(path.join('./access.log'), { flags: 'a' })

connectDB(process.env.PORT, process.env.DATABASE_PATH, app)

// Middlewares
app.use(express.json())
app.use(morgan('tiny', { stream: accessLogStream }))
app.use('/',crudRoute)
app.use('/',serviceRoute)
