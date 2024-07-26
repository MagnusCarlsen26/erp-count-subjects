import mongoose from "mongoose"

const cookiesSchema = mongoose.Schema({
    cookie : String,
    subjects : String,
    time : Number
})

const  cookiesModel = mongoose.model('cookies',cookiesSchema)
export default cookiesModel