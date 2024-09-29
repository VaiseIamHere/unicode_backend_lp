import express from "express"
import authenticate from "../middlewares/authentication.js"
import uploadFile from "../middlewares/fileUploadM.js"
import controller from "../controllers/fileController.js"

const route = express.Router()

route.use(authenticate)

route.post('/upload', uploadFile.upload.single('profilePic'), controller.uploadPic)

route.delete('/deletePP', controller.deletePic)

export default route
