import {v2 as cloudinary} from "cloudinary"
import user from "../models/userModel.js"
import fs from "fs"


// Helper Functions:
// 1. To delete file locally
const deleteFile = (path) => {
    fs.unlink(path, ((err) => {
        if(err){
            console.log("Error in File Deletion(From Server):")
            console.log(err)
        }
    }))
}

// 2. To upload to cloudinary
const uploadToCloudinary = async (req) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        const updates = {
            profilePic: result.secure_url
        }
        await user.findOneAndUpdate({"emailId": req.user.emailId}, updates)
        deleteFile(req.file.path)
    }
    catch(err){
        console.log("Error occured in upload")
    }
}

// 3. To delete from cloudinary
const deleteFromCloudinary = async (req, temp) => {
    const updates = {
        profilePic: "NoProfilePic"
    }
    const resource = temp.profilePic.split('/').at(-1).split('.')[0]
    await cloudinary.api.delete_resources(
        [resource],
        { type: 'upload', resource_type: 'image' }
    )
}

// Controllers
const uploadPic = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(temp.profilePic == "NoProfilePic"){
            uploadToCloudinary(req)
            return res.send(req.file)
        }
        else{
            deleteFile(req.file.path)
            return res.send("ProfilePic already exists !!")
        }
    }
    catch(err){
        console.log(err.message)
    }
}

const updatePic = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(temp.profilePic == "NoProfilePic"){
            return res.status(200).send("No Profile Pic")
        }
        deleteFromCloudinary(req, temp)
        uploadToCloudinary(req)
    }
    catch(err){
        console.log(err.message)
    }
}

const deletePic = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(temp.profilePic == "NoProfilePic"){
            return res.status(200).send("No Profile Pic Available")
        }
        deleteFromCloudinary(req, temp)
        return res.send("Profile Pic deleted sucessfully !!")
    }
    catch(err){
        console.log(err.message)
    }
}

const exports__ = {
    uploadPic,
    deletePic,
    updatePic
}

export default exports__
