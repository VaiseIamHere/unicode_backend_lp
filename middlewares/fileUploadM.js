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
const uploadImage = multer({
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

// Upload only pdf with size less than 5MB
const uploadResume = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype.split('/')[1] == 'pdf'){
            cb(null, true)
        }
        else{
            cb(null, false)
            return cb(new Error("Only pdf format supported."))
        }
    },
    limits: { fileSize: 5*1024*1024}
})

const exports__ = {
    uploadImage,
    uploadResume
}

export default exports__
