import express from "express"
import crudRoute from "./routes/crudRoutes.js"
import serviceRoute from "./routes/serviceRoutes.js"
import fileRoute from "./routes/fileRoutes.js"
import path from "path"
import fs from "fs"
import morgan from "morgan"
import connect from "./connect.js"


const app = express()

const accessLogStream = fs.createWriteStream(path.join('./access.log'), { flags: 'a' })

connect.connectDB(app)
connect.connectCloud()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(morgan('tiny', { stream: accessLogStream }))

app.get('/', (req, res) => {
    res.send('Hello User !!')
})
app.use('/', serviceRoute)
app.use('/', crudRoute)
app.use('/', fileRoute)
