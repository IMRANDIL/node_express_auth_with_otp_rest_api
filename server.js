require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')


const app = express();







const PORT = process.env.PORT || 3000;



mongoose.connect(process.env.URI).then(() => {
    console.log(`DB CONNECTED😃`);
    app.listen(PORT, () => {
        console.log(`server runs on port: ${PORT}😆`);
    })
})