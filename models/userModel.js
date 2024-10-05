import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        emailId:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: "NoProfilePic"
        },
        resume_url: String,
        techStack: [String],
        field_of_Interest: [String],
        experience: Number,
        bio: String
    }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
