// import userModel from "../models/model1.js"
const user = require('../models/model1.js')
const bcryptjs = require('bcryptjs')

const errorDetected = async (res, err) =>{
    console.log(err.message)
    res.status(500).json({"Error": err.message})
}

const read = async (req, res) => {
    try{
        temp = await user.find({})
        res.status(200).json(temp)
    }
    catch(err){
        errorDetected(res, err)
    }
}

const update = async (req, res) => {
    try{
        check = req.body.hasOwnProperty("emailId")
        if(check){
            updatedUser = {}
            if(req.body.hasOwnProperty("password")){
                // const salt = await bcryptjs.genSalt()
                const hashedPassword = await bcryptjs.hash(req.body.password, 10)
                updatedUser['password'] = hashedPassword
            }
            if(req.body.hasOwnProperty('username')){
                updatedUser['username'] = req.body.username
            }
            temp = await user.findOneAndUpdate({"emailId": req.body.emailId}, updatedUser, {new: true})
            if(temp == null){
                return res.send("User do not exists !!")
            }
            res.status(200).json(temp)
        }
        else{
            res.send("Cannot Update without email of the user !!!")
        }
    }
    catch(err){
        errorDetected(res, err)
    }
}

const deleteUser = async (req, res) => {
    try{
        if(!req.body.hasOwnProperty("emailId")){
            return res.send("Cannot delete without email of the user !!!")
        }
        email = req.body.emailId
        check = await user.deleteMany({"emailId": email})
        if(check.deletedCount > 0){
            res.send("User deleted sucessfully !!")
        }
        else{
            res.send("User do not exits!!")
        }
    }
    catch(err){
        errorDetected(res, err)
    }
}

module.exports = {
    read,
    update,
    deleteUser
}