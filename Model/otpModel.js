const mongoose = require('mongoose');


otpSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    }


}, { timestamps: true })





module.exports = mongoose.model('Otp', otpSchema)