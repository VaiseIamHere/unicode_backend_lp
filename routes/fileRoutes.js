import express from "express"
import authenticate from "../middlewares/authentication.js"
import controller from "../controllers/fileUpload.js"

const route = express.Router()

route.use(authenticate)

route.post('/upload', controller.upload.single('profilePic'), controller.uploadFile)

export default route
