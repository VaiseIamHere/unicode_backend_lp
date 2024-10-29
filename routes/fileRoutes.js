import express from "express"
import authenticate from "../middlewares/authentication.js"
import uploadFile from "../middlewares/fileUploadM.js"
import pp from "../controllers/user/ppControl.js"
// import resume from "../controllers/user/resumeControl.js"


const routePP = express.Router()
const routeResume = express.Router()
const route = express.Router()

// Profile Pic Routes
routePP.post('/upload', uploadFile.upload.single('profilePic'), pp.uploadPic)
routePP.delete('/delete', pp.deletePic)
routePP.put('/update', uploadFile.upload.single('profilePic'), pp.updatePic)


// Resume Routes
// routeResume.post('/upload', uploadFile.upload.single('profilePic'), resume.uploadResume)
// routeResume.delete('/delete', resume.deleteResume)
// routeResume.put('/update', uploadFile.upload.single('profilePic'), resume.updateResume)

// Main Route
route.use(authenticate.authenticateUser)
route.use('/pp', routePP)
route.use('/resume', routeResume)

export default route
