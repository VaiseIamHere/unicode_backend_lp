import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        id: Number,
        username:{
            type: String,
            required: true
        },
        emailID:{
            type: String,
            required: true
        }
    }
)

const userModel = mongoose.model('user', userSchema)

export default userModel