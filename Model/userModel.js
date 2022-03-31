const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')



const userSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    }


}, { timestamps: true });




userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.SECRET, { expiresIn: '7d' })
}









module.exports = mongoose.model('User', userSchema)