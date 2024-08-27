import userModel from "../models/model1.js"

const user = userModel

const errorDetected = async (res, err) =>{
    console.log(err.message)
    res.status(500).json({"Error": err.message})
}

export const createUser = async (req, res) => {
    existing = await user.find({"username": req.body.name})
    if(existing.length == 0){
        try{
            temp = await user.create(req.body)
            return res.status(200).json(temp)
        }
        catch(err){
            errorDetected(res, err)
        }
    }
    else{
        res.status(200).send("Student with same id already exists !!")
    }
}

export const read = async (req, res) => {
    try{
        temp = await user.find({})
        res.status(200).json(temp)
    }
    catch(err){
        errorDetected(res, err)
    }
}

export const update = async (req, res) => {
    try{
        username = req.params.username
        check = !req.body.hasOwnProperty("username")
        if(check){
            temp = await student.findOneAndUpdate({"username": username}, req.body, {new: true})
            if(temp == null){
                return res.send("User do not exists !!")
            }
            res.status(200).json(temp)
        }
        else{
            res.send("Cannot Update username !!!")
        }
    }
    catch(err){
        errorDetected(res, err)
    }
}

export const deleteUser = async (req, res) => {
    try{
        username = req.params.username
        check = await student.deleteMany({"username": username})
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
