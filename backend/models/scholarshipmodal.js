const mongoose = require("mongoose");
const scholarshipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    criteria: {
        type: String,
        required: true,
    },
    guidelines:{
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
        default: Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    amount: {
        type: Number,
        required: true,
    },
    fundsAvailable: {
        type: Number,
        required: true,
    },
    fundallocated: {
        type: Number,
        required: true,
    },
    date:{
        type: Date,
    

    }
    

});
module.exports = mongoose.model("Scholarship", scholarshipSchema)