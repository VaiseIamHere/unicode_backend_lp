const express = require('express')
const controller = require('../controllers/service.js')
const route = express.Router()

route.post('/register', controller.registerUser)

module.exports = route
