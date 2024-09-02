// import express from "express"
// import mongoose from "mongoose"
// import route from "./routes/crudRoutes.js"
// import dotenv from "dotenv"
// import path from "path"
// import fs from "fs"
// import morgan from "morgan"
require('dotenv').config()

const express = require('express')
const crudRoute = require('./routes/crudRoutes.js')
const serviceRoute = require('./routes/serviceRoutes.js')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const connectDB = require('./connectDB.js')

const app = express()

dotenv.config()
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

connectDB(process.env.PORT, process.env.DATABASE_PATH, app)

// Middlewares
app.use(express.json())
app.use(morgan('tiny', { stream: accessLogStream }))
app.use('/',crudRoute)
app.use('/',serviceRoute)
