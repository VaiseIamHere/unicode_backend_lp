import {v2 as cloudinary} from "cloudinary"

const uploadFile = (req, res) => {
    try{
        const x = cloudinary.uploader
        .upload(req.userfile.path, {
            resource_type: req.userfile.mimetype,
            overwrite: true })
        .then((result) => { console.log(result) })
        console.log(x)
    }
    catch(err){
        console.log(err.message)
    }
    res.send(req.file)
}

const exports__ = {
    uploadFile
}

export default exports__
