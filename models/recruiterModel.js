import mongoose from "mongoose"

const recruiterSchema = mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    company: {
        type: mongoose.ObjectId,
        ref: 'company'
    },
    date_of_joining: String,
    current_position: String
})

const recruiterModel = mongoose.model('recruiter', recruiterSchema)

export default recruiterModel
