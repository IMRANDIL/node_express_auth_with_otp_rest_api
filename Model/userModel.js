const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const { Schema } = mongoose;


const userSchema = new Schema({
    number: {
        type: String,
        required: true
    }


}, { timestamps: true });




userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.SECRET, { expiresIn: '7d' });

    return token;
}









module.exports = mongoose.model('User', userSchema)