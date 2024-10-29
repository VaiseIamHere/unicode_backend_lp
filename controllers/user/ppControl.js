import {v2 as cloudinary} from "cloudinary"
import user from "../../models/userModel.js"
import { deleteFile } from "../../utils/deleteFile.js"


// Helper functions:
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

const deleteFromCloudinary = async (req, resource) => {
    const updates = {
        profilePic: "NoProfilePic"
    }
    await cloudinary.api.delete_resources(
        [resource],
        { type: 'upload', resource_type: 'image' }
    )
    await user.findOneAndUpdate({"emailId": req.user.emailId}, updates)
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
        res.status(404).send(err.message)
        return console.log(err.message)
    }
}

const updatePic = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(temp.profilePic == "NoProfilePic"){
            return res.status(200).send("No Profile Pic")
        }
        const resource = temp.profilePic.split('/').at(-1).split('.')[0]
        deleteFromCloudinary(req, resource)
        uploadToCloudinary(req)
        return res.status(200).send("Updated.")
    }
    catch(err){
        console.log(err.message)
        return res.status(404).send(err.message)
    }
}

const deletePic = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(temp.profilePic == "NoProfilePic"){
            return res.status(200).send("No Profile Pic Available")
        }
        const resource = temp.profilePic.split('/').at(-1).split('.')[0]
        deleteFromCloudinary(req, resource)
        return res.send("Profile Pic deleted sucessfully !!")
    }
    catch(err){
        console.log(err.message)
        return res.status(404).send(err.message)
    }
}

const exports__ = {
    uploadPic,
    deletePic,
    updatePic
}

export default exports__
