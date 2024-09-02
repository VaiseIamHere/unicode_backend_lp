// import userModel from "../models/model1.js"
const user = require('../models/model1.js')

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
        id = req.params.id
        check = !req.body.hasOwnProperty("id")
        if(check){
            temp = await user.findOneAndUpdate({"id": id}, req.body, {new: true})
            if(temp == null){
                return res.send("User do not exists !!")
            }
            res.status(200).json(temp)
        }
        else{
            res.send("Cannot Update user ID !!!")
        }
    }
    catch(err){
        errorDetected(res, err)
    }
}

const deleteUser = async (req, res) => {
    try{
        id = req.params.id
        check = await user.deleteMany({"username": id})
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