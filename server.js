require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')

const app = express();



app.use('/api/user', userRouter)



const PORT = process.env.PORT || 3000;



mongoose.connect(process.env.URI).then(() => {
    console.log(`DB CONNECTED😃`);
    app.listen(PORT, () => {
        console.log(`server runs on port: ${PORT}😆`);
    })
})