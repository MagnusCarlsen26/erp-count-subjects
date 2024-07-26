import mongoose from "mongoose"

const subscribersSchema = mongoose.Schema({
    email : String,
    subject : String,
    time : Number

})

const subscribersModel = mongoose.model('subscribers',subscribersSchema)
export default subscribersModel