import express from "express"
import controller from "../controllers/service.js"

const route = express.Router()

route.get('/', async (req, res) => {
    res.send("Server Connected")
})

route.post('/register', controller.registerUser)

route.post('/login', controller.loginUser)

export default route
