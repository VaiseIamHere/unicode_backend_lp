import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const newname = `${Date.now()}_${file.originalname}`
        cb(null , newname)
    }
})

// Upload only Images with size less than 1.5MB

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype.split('/')[0] == 'image'){
            cb(null, true)
        }
        else{
            cb(null, false)
            return cb(new Error("Only image formats supported."))
        }
    },
    limits: { fileSize: 1.5*1024*1024}
})

const exports__ = {
    upload
}

export default exports__
