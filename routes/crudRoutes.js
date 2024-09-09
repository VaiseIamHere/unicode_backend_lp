import express from "express"
import controller from "../controllers/crudOperations.js"
import authenticate from "../middlewares/authentication.js"

const route = express.Router()

route.use(authenticate)

route.get('/view', controller.read)

route.put('/update', controller.update)

route.delete('/delete', controller.deleteUser)

export default route
