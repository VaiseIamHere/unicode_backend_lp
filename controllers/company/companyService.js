import dotenv from "dotenv"
import company from "../../models/companyModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

dotenv.config()

const registerCompany = async (req, res) => {
    try{
        if(!req.body.password){
            return res.status(500).send('Password Required !!')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword
        console.log(req.body)
        const comp = await company.create(req.body)
        return res.status(200).send(comp)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const loginCompany = async (req, res) => {
    try{
        if(!(req.body.cname && req.body.password)){
            return res.status(400).send('Credentials required !!')
        }
        const comp = await company.find({
            "cname": req.body.cname
        })
        if(comp.length == 0){
            return res.status(400).send('Cannot find company !!')
        }
        if(await bcrypt.compare(req.body.password, comp[0].password)){

            const payload = {
                "cname": req.body.cname
            }
            const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

            return res.status(200).json({
                'msg':'Sucessfully Logged In !!!',
                'accessToken': accessToken
            })
        }
        else{
            return res.status(400).send('Authentication Failed !!')
        }
    }
    catch(err){
        console.log("error")
        res.status(500).send(err)
    }
}

const exports__ = {
    registerCompany,
    loginCompany
}

export default exports__
