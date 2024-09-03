require('dotenv').config()
const nodemailer = require("nodemailer")


const sendMail = async (req, res, mail) => {
    const email = {
        from: `"Vaibhav & Co." <${process.env.MAIL}>`,
        to: [req.body.emailId],
        subject: mail.subject,
        text: mail.body
    }
    console.log(process.env.MAIL)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
              user: process.env.MAIL,
              pass: process.env.MAIL_PASSWORD,
            }
    })
    try{
        const info = transporter.sendMail(email)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = sendMail