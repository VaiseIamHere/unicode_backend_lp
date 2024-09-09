import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
     },
    filename: (req, file, cb) => {
        cb(null , `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({ 'storage': storage })

const uploadFile = (req, res) => {
    res.send(req.file)
}

const exports__ = {
    upload,
    uploadFile
}

export default exports__
