import express from "express"
import mongoose from "mongoose"
import route from "./routes/crudRoutes.js"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"

const app = express()

dotenv.config()
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(express.json())
app.use(morgan('combined', {stream: accessLogStream}))
app.use('/',route)

const port = process.env.PORT

mongoose.connect(process.env.DATABASE_PATH)
.then(()=>{
    console.log("Connected to Database.")
    app.listen(port, () => {
        console.log(`Server started and Listening at: http://localhost:${port}`)
    })
})
.catch(()=>{
    console.log("Connection to Database Failed !!")
})
