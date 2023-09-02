const bodyParser = require('body-parser')
const express = require('express')
const app = express().use(bodyParser.json());
const port = 5000
const User = require('./modals/user')
const mongoose = require('mongoose')
const verifyToken = require('./middlewares/jwt');

app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))

// const cors = require('cors');

// const hookroutes = require('./routes/webhooks')
const accessToken = "EAALySOJUMrQBOZBq5y57LN4l81ZB75yBmKU7FFPrZC4sRtrHNfiQtsZBDiWYff2W8F13EZAU3gfRzhEdddWkCz6TNVh08OUIeYSR0tMcIZA5nC7nwzmZAZCs2bqct0zlbFrB7s7x5JqXYQ9zC69gMy0DwsmmwhqsodZBMUYHhWZBGlq3ZCvGJuSBZCTgjTxmPaxA1ZAYq"
const veryfyToken = "Nigger"

app.use("/api/hook", require("./routes/webhooks"));
app.use("/auth", require("./routes/user"));

app.get('/protected', verifyToken, async (req, res) => {
    const email = req.user;

    if (!email) {
        return res.status(401).json({ message: "Auth failed" });
    }
    em = email.email
    const user = await User.findOne({ em });

    res.json({message : "Authenticated", user})
})

console.log('working')
const connectDB = require('./config');
connectDB();

app.listen(5000)