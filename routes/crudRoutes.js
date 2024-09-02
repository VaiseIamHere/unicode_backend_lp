// const express = require('express')
// const controller = require('./controller.js')
// const route = express.Router()

// import express from "express";
// import * as controller from "../controllers/crudOperations.js"

const express = require('express')
const controller = require('../controllers/crudOperations.js')
const route = express.Router()

route.get('/', async (req, res) => {
    res.send("Server Connected")
})

route.get('/view', controller.read)

route.put('/update', controller.update)

route.delete('/delete' ,controller.deleteUser)

module.exports = route
