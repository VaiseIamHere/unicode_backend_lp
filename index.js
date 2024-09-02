// import express from "express"
// import mongoose from "mongoose"
// import route from "./routes/crudRoutes.js"
// import dotenv from "dotenv"
// import path from "path"
// import fs from "fs"
// import morgan from "morgan"

const express = require('express')
const route = require('./routes/crudRoutes.js')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const connectDB = require('./connectDB.js')

const app = express()
const port = process.env.PORT

dotenv.config()

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// Middlewares
app.use(express.json())
app.use(morgan('tiny', { stream: accessLogStream }))
app.use('/',route)

connectDB(process.env.PORT, process.env.DATABASE_PATH, app)
