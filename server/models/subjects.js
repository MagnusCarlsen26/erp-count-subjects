import mongoose from "mongoose"

const subjectSchema = mongoose.Schema({
    subject : String,
    code : String,
    count : Number,
    time : Number
})

const subjectModel = mongoose.model('Subject',subjectSchema)
export default subjectModel