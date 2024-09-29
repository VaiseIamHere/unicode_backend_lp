import {v2 as cloudinary} from "cloudinary"
import user from "../models/model1.js"
import fs from "fs"

const deleteFile = (path) => {
    fs.unlink(path, ((err) => {
        if(err){
            console.log("Error in File Deletion(From Server):")
            console.log(err)
        }
    }))
}

const uploadPic = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(temp.profilePic == "NoProfilePic"){
            cloudinary.uploader.upload(req.file.path)
                .then(async (result) => {
                    const updates = {
                        profilePic: result.secure_url
                    }
                    await user.findOneAndUpdate({"emailId": req.user.emailId}, updates)
                    deleteFile(req.file.path)
                })
                .catch(() => {
                    console.log("Upload Failed")
                })
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

const deletePic = async (req, res) => {
    try{
        const temp = (await user.find({'emailId': req.user.emailId}))[0]
        if(temp.profilePic == "NoProfilePic"){
            return res.status(200).send("No Profile Pic")
        }
        const updates = {
            profilePic: "NoProfilePic"
        }
        const resource = temp.profilePic.split('/').at(-1).split('.')[0]
        cloudinary.api.delete_resources(
            [resource],
            { type: 'upload', resource_type: 'image' }
        )
        .then((async (x) => {
            await user.findOneAndUpdate({emailId: req.user.emailId}, updates)
        }))
        return res.send("Profile Pic deleted sucessfully !!")
    }
    catch(err){
        console.log(err.message)
    }
}

const exports__ = {
    uploadPic,
    deletePic
}

export default exports__
