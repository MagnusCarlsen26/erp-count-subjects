import mongoose from "mongoose"

const trafficSchema = mongoose.Schema({
    isTouch : String,
    time : Number
})

const  trafficModel = mongoose.model('traffic',trafficSchema)
export default trafficModel