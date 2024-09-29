import dotenv from "dotenv"
import user from "../models/model1.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import sendMail from "./mailservice.js"

dotenv.config()

const registerUser = async (req, res) => {
    try{
        if(!req.body.emailId.includes('@gmail.com')){
            return res.status(500).send('Invalid gmail !!')
        }
        const temp = await user.find({
            "emailId": req.body.emailId
        })
        if(temp.length == 0){
            const mail = {
                'subject': 'Registration Sucessfull !!!',
                'body': 'You are now a registered user of our website.\nEnjoy our website !!!'
            }
            try{
                sendMail(req, mail)
            }
            catch(err){
                return res.send('Error in mail service')
            }
            const hashedPassword = await bcryptjs.hash(req.body.password, 10)
            const userObj = await user.create({
                username: req.body.username,
                emailId: req.body.emailId,
                password: hashedPassword
            })
            return res.status(200).send(userObj)
        }
        else{
            res.status(200).send('User already exists !!')
        }
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

const loginUser = async (req, res) => {
    try{
        const temp = await user.find({'emailId': req.body.emailId})
        if(temp.length == 0){
            return res.status(400).send('Cannot find user !!')
        }
        if(await bcryptjs.compare(req.body.password, temp[0].password)){
            const payload = {
                'emailId': req.body.emailId
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
            const mail = {
                'subject': 'Logged In sucessfully',
                'body': 'You logged in to Vaibhav\'s website'
            }
            sendMail(req, mail)
            return res.status(200).json({
                'msg':'Sucessfully Logged In !!!',
                'accessToken': accessToken
            })
        }
        return res.status(200).send('Invalid email or password')
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

const exports__ = {
    registerUser,
    loginUser
}

export default exports__
