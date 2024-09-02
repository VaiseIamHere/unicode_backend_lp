const user = require('../models/model1.js')
const bcryptjs = require('bcryptjs')

const registerUser = async (req, res) => {
    try{
        email = req.body.emailID
        if(!email.includes('@gmail.com')){
            return res.status(500).send('Invalid gmail !!')
        }
        temp = await user.find({
            "emailID": email
        })
        if(temp.length == 0){
            const salt = await bcryptjs.genSalt()
            const hashedPassword = await bcryptjs.hash(req.body.password, salt)
            const userObj = await user.create({
                username: req.body.username,
                emailID: req.body.emailID,
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

module.exports = {
    registerUser,
}