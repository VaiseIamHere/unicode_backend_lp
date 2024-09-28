import {v2 as cloudinary} from "cloudinary"
import user from "../models/model1.js"

const updateProfilePic = async (req, result) => {
    const updates = {
        profilePic: result.url
    }
    await user.findOneAndUpdate({"emailId": req.user.emailId}, updates)
}

const uploadFile = async (req, res) => {
    try{
        cloudinary.uploader.upload(req.file.path).then(result => updateProfilePic(req, result))
        return res.send(req.file)
    }
    catch(err){
        console.log(err.message)
    }
}

const deleteFile = async (req, res) => {
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
        await user.findOneAndUpdate({emailId: req.user.emailId}, updates)
        return res.send("ok")
    }
    catch(err){
        console.log(err.message)
    }
}

const exports__ = {
    uploadFile,
    deleteFile
}

export default exports__
