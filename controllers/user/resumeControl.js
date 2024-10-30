import {v2 as cloudinary} from "cloudinary"
import user from "../../models/userModel.js"
import fs from "fs"


// Helper functions:
const uploadToCloudinary = async (req) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path, {resource_type: 'raw'})
        const updates = {
            resume_url: result.secure_url
        }
        await user.findOneAndUpdate({"emailId": req.user.emailId}, updates)
        fs.unlinkSync(req.file.path)
    }
    catch(err){
        console.log("Error occured in uploadToCloudinary")
        console.log({Error: err.message})
        throw new Error(err.message)
    }
}

const deleteFromCloudinary = async (req, resource) => {
    const updates = {
        resume_url: ""
    }
    await cloudinary.api.delete_resources(
        [resource],
        { type: 'upload', resource_type: 'raw' }
    )
    await user.findOneAndUpdate({"emailId": req.user.emailId}, updates)
}


// Controllers
const uploadResume = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        
        if(!temp.resume_url){
            uploadToCloudinary(req)
            return res.send(req.file)
        }
        else{
            fs.unlinkSync(req.file.path)
            return res.send("Resume already exists !!")
        }
    }
    catch(err){
        res.status(404).send(err.message)
        return console.log(err.message)
    }
}

const updateResume = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(!temp.resume_url){
            return res.status(200).send("No resume available")
        }
        const resource = temp.resume_url.split('/').at(-1)
        deleteFromCloudinary(req, resource)
        uploadToCloudinary(req)
        return res.status(200).send("Updated.")
    }
    catch(err){
        fs.unlinkSync(req.file.path)
        console.log(err.message)
        return res.status(404).send(err.message)
    }
}

const deleteResume = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(!temp.resume_url){
            return res.status(200).send("No resume available")
        }
        const resource = temp.resume_url.split('/').at(-1)
        deleteFromCloudinary(req, resource)
        return res.send("Resume deleted sucessfully !!")
    }
    catch(err){
        console.log(err.message)
        return res.status(404).send(err.message)
    }
}

export default {
    uploadResume,
    deleteResume,
    updateResume
}
