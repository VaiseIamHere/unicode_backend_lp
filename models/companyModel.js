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
        recruiters: {
            type: [String]
        },
        description: String,
        website_url: String
    }
)

const companyModel = mongoose.model('company', companySchema)

export default companyModel
