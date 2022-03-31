const mongoose = require('mongoose');


otpSchema = mongoose.Schema({



}, { timestamps: true })





module.exports = mongoose.model('Otp', otpSchema)