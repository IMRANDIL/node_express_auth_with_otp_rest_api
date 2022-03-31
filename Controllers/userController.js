const bcrypt = require('bcrypt');

const _ = require('lodash');


const axios = require('axios');

const otpGenerator = require('otp-generator');


const Otp = require('../Model/otpModel');

const User = require('../Model/userModel');



exports.signUp = async (req, res, next) => {

    const user = await User.findOne({
        number: req.body.number
    });

    if (user) return res.status(400).send('User already registered!');

    const OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })

    const number = req.body.number;
    console.log(OTP);



}


exports.verifyOtp = async (req, res, next) => {

}