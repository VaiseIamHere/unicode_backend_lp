import express from "express"
import controller from "../controllers/crudOperations.js"
import authenticate from "../middlewares/authentication.js"

const route = express.Router()

route.get('/', async (req, res) => {
    res.send("Server Connected")
})

route.get('/view', authenticate, controller.read)

route.put('/update', authenticate, controller.update)

route.delete('/delete', authenticate, controller.deleteUser)

export default route
