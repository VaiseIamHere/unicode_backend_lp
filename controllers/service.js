const user = require('../models/model1.js')
const bcryptjs = require('bcryptjs')

const registerUser = async (req, res) => {
    try{
        if(!req.body.emailId.includes('@gmail.com')){
            return res.status(500).send('Invalid gmail !!')
        }
        temp = await user.find({
            "emailId": req.body.emailId
        })
        if(temp.length == 0){
            // const salt = await bcryptjs.genSalt()
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
        temp = await user.find({'emailId': req.body.emailId})
        if(temp.length == 0){
            return res.status(400).send('Cannot find user !!')
        }
        if(await bcryptjs.compare(req.body.password, temp[0].password)){
            return res.status(200).send('Sucessfully Logged In !!!')
        }
        return res.status(200).send('Invalid email or password')
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

module.exports = {
    registerUser,
    loginUser
}