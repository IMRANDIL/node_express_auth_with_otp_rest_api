const bcrypt = require('bcrypt');

const _ = require('lodash');


const axios = require('axios');

const otpGenerator = require('otp-generator');


const Otp = require('../Model/otpModel');

const User = require('../Model/userModel');



exports.signUp = async (req, res, next) => {

    try {

        const { number } = req.body;


        const user = await User.findOne({ number });

        if (user) return res.status(400).send('User already registered!');

        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })




        const otp = new Otp({ number: number, otp: OTP });

        const salt = await bcrypt.genSalt(10)

        otp.otp = await bcrypt.hash(otp.otp, salt);

        const result = await otp.save();

        return res.status(200).send('Otp sent successfully!')








    } catch (error) {
        console.log(error);
    }


}


exports.verifyOtp = async (req, res, next) => {

}