import user from "../../models/userModel.js"
import bcryptjs from "bcryptjs"

const errorDetected = async (res, err) =>{
    console.log(err.message)
    res.status(500).json({"Error": err.message})
}

const read = async (req, res) => {
    try{
        const temp = (await user.find({"emailId": req.user.emailId}))[0]
        res.status(200).json(temp)
    }
    catch(err){
        errorDetected(res, err)
    }
}

const update = async (req, res) => {
    try{
        const updates = { ...req.body }
        delete updates.emailId
        updates.$addToSet = {}
        if(updates.password){
            const hashedPassword = await bcryptjs.hash(updates.password, 10)
            updates.password = hashedPassword
        }
        if(updates.techStack){
            updates.$addToSet.techStack = {
                $each: updates.techStack
            }
            delete updates.techStack
        }
        if(updates.field_of_Interest){
            updates.$addToSet.field_of_Interest = {
                $each: updates.field_of_Interest
            }
            delete updates.field_of_Interest
        }
        const temp = await user.findOneAndUpdate({"emailId": req.user.emailId}, updates, {new: true})
        return res.status(200).json(temp)
    }
    catch(err){
        errorDetected(res, err)
    }
}

const deleteUser = async (req, res) => {
    try{
        const check = await user.deleteMany({"emailId": req.user.emailId})
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

const exports__ = {
    read,
    update,
    deleteUser
}

export default exports__
