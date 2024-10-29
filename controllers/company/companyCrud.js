import bcrypt from "bcryptjs"
import company from "../../models/companyModel.js"

const errorDetected = async (res, err) =>{
    console.log(err.message)
    res.status(500).json({"Error": err.message})
}

const read = async (req, res) => {
    try{
        const comp = await company.find({"cname": req.company.cname})
        return res.status(200).send(comp[0])
    }
    catch(err){
        errorDetected(res, err)
    }
}

const update = async (req, res) => {
    try{
        const updates = { ...req.body }
        delete updates.cname
        if(updates.password){
            const hashedPassword = await bcrypt.hash(updates.password, 10)
            updates.password = hashedPassword
        }
        if(updates.recruiters){
            updates.$addToSet = {
                recruiters: {
                    $each: updates.recruiters
                }
            }
            delete updates.recruiters
        }
        const companyUpdate = await company.findOneAndUpdate({"cname": req.company.cname}, updates, {new: true})
        return res.status(200).send(companyUpdate)
    }
    catch(err){
        errorDetected(res, err)
    }
}

const deleteCompany = async (req, res) => {
    try{
        const check = await company.deleteMany({"cname": req.company.cname})
        if(check.deletedCount > 0){
            res.send("Company deleted sucessfully !!")
        }
        else{
            res.send("Company do not exits!!")
        }
    }
    catch(err){
        errorDetected(res, err)
    }
}

const exports__ = {
    read,
    update,
    deleteCompany
}

export default exports__
