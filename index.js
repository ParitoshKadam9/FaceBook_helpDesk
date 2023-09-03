const bodyParser = require('body-parser')
const express = require('express')
const app = express().use(bodyParser.json());
const port = 5000
const User = require('./modals/user')
const mongoose = require('mongoose')
const verifyToken = require('./middlewares/jwt');
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
var cors = require("cors");
const http = require("http")
const {Server} = require("socket.io")
const server = http.createServer(app)
const socketIo = require('socket.io')

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on('connection', (socket) => {
  
  console.log('A Client Connected');

  socket.on('customEvent', (data) => {
    console.log('recieved data from client', data);
    socket.broadcast.emit("send_msg", data)
    console.log('nice')
  })


  socket.on('disconnect', () => {
    console.log('A client disconnected')
  })

})
//-----------------WEBSOCKET USE-------------


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
        return res.status(401).json({ auth : false });
    }
    let user = await User.findOne({ email : email });
    console.log(user)
    res.json({auth : true, user})
})

//-----------------YAHA PE  its passport for getting the user access token --------

//=---------------------------------passport end --------------------------------------------------------------------

console.log('working')
const connectDB = require('./config');
connectDB();

module.exports = server


server.listen(5000)
