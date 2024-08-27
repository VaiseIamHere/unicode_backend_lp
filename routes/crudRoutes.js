// const express = require('express')
// const controller = require('./controller.js')
// const route = express.Router()

import express from "express";
import * as controller from "../controllers/crudOperations.js"

const route = express.Router()

route.get('/', async (req, res) => {
    res.send("Server Connected")
})

route.post('/create', controller.createUser)

route.get('/view', controller.read)

route.put('/update/:id', controller.update)

route.delete('/delete/:id' ,controller.deleteUser)

export default route
