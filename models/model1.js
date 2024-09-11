import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        emailId:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: false,
            default: "No profile pic"
        }
    }
)

const userModel = mongoose.model('user', userSchema)

export default userModel
