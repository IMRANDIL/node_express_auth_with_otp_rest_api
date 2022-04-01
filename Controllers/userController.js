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

        console.log(OTP);


        const otp = new Otp({ number: number, otp: OTP });

        const salt = await bcrypt.genSalt(10)

        otp.otp = await bcrypt.hash(otp.otp, salt);

        const result = await otp.save();

        return res.status(200).send('Otp sent successfully!')








    } catch (error) {
        console.log(error);
    }


}


//VERIFY OTP NOW....




exports.verifyOtp = async (req, res, next) => {


    try {





        const otpHolder = await Otp.find({
            number: req.body.number
        });

        if (otpHolder.length === 0) return res.status(400).send('You use an expired OTP!');

        const rightOtpFind = otpHolder[otpHolder.length - 1];

        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

        if (rightOtpFind.number === req.body.number && validUser) {
            const user = new User(_.pick(req.body, ['number']));

            const token = user.generateJWT();

            const result = await user.save();


            const OTPdelete = await Otp.deleteMany({
                number: rightOtpFind.number
            });
            return res.status(200).json({ msg: 'User registration successful!', token: token, data: result })
        } else {
            return res.status(400).send('Your OTP is wrong!')
        }








    } catch (error) {
        console.log(error);
    }




}