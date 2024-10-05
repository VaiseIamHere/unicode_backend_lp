import express from "express"
import userController from "../controllers/user/userCrud.js"
import companyController from "../controllers/company/companyCrud.js"
import authenticate from "../middlewares/authentication.js"

const route = express.Router()
const userRoute = express.Router()
const companyRoute = express.Router()

// User routes
userRoute.use(authenticate.authenticateUser)

userRoute.get('/view', userController.read)
userRoute.put('/update', userController.update)
userRoute.delete('/delete', userController.deleteUser)

// Company routes
companyRoute.use(authenticate.authenticateCompany)

companyRoute.get('/view', companyController.read)
companyRoute.put('/update', companyController.update)
companyRoute.delete('/delete', companyController.deleteCompany)

// Main Router
route.use('/user', userRoute)
route.use('/company', companyRoute)

export default route
