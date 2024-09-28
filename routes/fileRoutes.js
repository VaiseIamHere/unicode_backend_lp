import express from "express"
import authenticate from "../middlewares/authentication.js"
import uploadFile from "../middlewares/fileUploadM.js"
import controller from "../controllers/fileController.js"

const route = express.Router()

route.use(authenticate)

route.post('/upload', uploadFile.upload.single('profilePic'), controller.uploadFile)

route.delete('/deletePP', controller.deleteFile)

export default route
