import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
     },
    filename: (req, file, cb) => {
        const newname = `${Date.now()}_${file.originalname}`
        cb(null , newname)
        req.userfile = {
            mimetype: file.mimetype,
            path: './uploads' + newname
        }
    }
})

const upload = multer({ 'storage': storage })

const exports__ = {
    upload
}

export default exports__
