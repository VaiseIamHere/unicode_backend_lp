import express from "express"
import authenticate from "../middlewares/authentication.js"
import file from "../middlewares/fileUploadM.js"
import pp from "../controllers/user/ppControl.js"
import resume from "../controllers/user/resumeControl.js"


const routePP = express.Router()
const routeResume = express.Router()
const route = express.Router()

// Profile Pic Routes
routePP.post('/upload', file.uploadImage.single('profilePic'), pp.uploadPic)
routePP.delete('/delete', pp.deletePic)
routePP.put('/update', file.uploadImage.single('profilePic'), pp.updatePic)


// Resume Routes
routeResume.post('/upload', file.uploadResume.single('resume'), resume.uploadResume)
routeResume.delete('/delete', resume.deleteResume)
routeResume.put('/update', file.uploadResume.single('resume'), resume.updateResume)

// Main Route
route.use(authenticate.authenticateUser)
route.use('/pp', routePP)
route.use('/resume', routeResume)

export default route
