import mongoose from "mongoose"

const companySchema = mongoose.Schema(
    {
        cname:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        description: String,
        website: String
    }
)

const companyModel = mongoose.model('company', companySchema)

export default companyModel
