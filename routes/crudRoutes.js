// const express = require('express')
// const controller = require('./controller.js')
// const route = express.Router()

// import express from "express";
// import * as controller from "../controllers/crudOperations.js"

const express = require('express')
const controller = require('../controllers/crudOperations.js')
const route = express.Router()
const authenticate = require('../middlewares/authentication.js')

route.get('/', async (req, res) => {
    res.send("Server Connected")
})

route.get('/view', authenticate, controller.read)

route.put('/update', authenticate, controller.update)

route.delete('/delete', authenticate, controller.deleteUser)

module.exports = route
