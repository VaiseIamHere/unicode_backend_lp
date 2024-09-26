import mongoose from "mongoose"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"

dotenv.config()

const connectDB = (app) => {
    mongoose.connect(process.env.DATABASE_PATH)
    .then(()=>{
        console.log("Connected to Database.")
        app.listen(process.env.PORT, () => {
            console.log(`Server started and Listening at: http://localhost:${process.env.PORT}`)
        })
    })
    .catch(()=>{
        console.log("Connection to Database Failed !!")
    })
}

const connectCloud = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true
    })
}

const exports__ = {
    connectDB,
    connectCloud
}

export default exports__
