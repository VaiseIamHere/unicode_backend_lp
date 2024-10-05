import express from "express"
import userController from "../controllers/user/userService.js"
import companyController from "../controllers/company/companyService.js"

const route1 = express.Router()
const route2 = express.Router()
const route = express.Router()

// User routes
route1.post('/register', userController.registerUser)
route1.post('/login', userController.loginUser)

// Company routes
route2.post('/register', companyController.registerCompany)
route2.post('/login', companyController.loginCompany)

// Configuration
route.use('/user', route1)
route.use('/company', route2)

export default route
