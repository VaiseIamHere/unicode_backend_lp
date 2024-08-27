import express from "express"
import mongoose from "mongoose"
import route from "./routes/crudRoutes.js"
import dotenv from "dotenv"
// import path from "path"
// import fs from "fs"
import morgan from "morgan"

const app = express()

dotenv.config()
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// , {stream: accessLogStream}

app.use(express.json())
app.use(morgan('combined'))
app.use('/',route)

const port = process.env.PORT || 6969
console.log(process.env.DATABASE_PATH)
mongoose.connect("mongodb+srv://singhvaibhav12062005:6hiyUsSZutje1LGj@backendforblog.mh9bml1.mongodb.net/?retryWrites=true&w=majority&appName=BackendForBlog")
.then(()=>{
    console.log("Connected to Database.")
    app.listen(port, () => {
        console.log(`Server started and Listening at: http://localhost:${port}`)
    })
})
.catch(()=>{
    console.log("Connection to Database Failed !!")
})
