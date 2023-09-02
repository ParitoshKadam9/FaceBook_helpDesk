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

app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))

// const cors = require('cors');

// const hookroutes = require('./routes/webhooks')
const accessToken = "EAALySOJUMrQBOZBq5y57LN4l81ZB75yBmKU7FFPrZC4sRtrHNfiQtsZBDiWYff2W8F13EZAU3gfRzhEdddWkCz6TNVh08OUIeYSR0tMcIZA5nC7nwzmZAZCs2bqct0zlbFrB7s7x5JqXYQ9zC69gMy0DwsmmwhqsodZBMUYHhWZBGlq3ZCvGJuSBZCTgjTxmPaxA1ZAYq"
const veryfyToken = "Nigger"

app.use("/api/hook", require("./routes/webhooks"));
app.use("/auth", require("./routes/user"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.get('/protected', verifyToken, async (req, res) => {
    const email = req.user;

    if (!email) {
        return res.status(401).json({ auth : false });
    }
    em = email.email
    const user = await User.findOne({ em });

    res.json({auth : true, user})
})

//-----------------YAHA PE  its passport for getting the user access token --------

// // Configure session middleware
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// // Initialize Passport and session middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Your Facebook App credentials
// const facebookAppId = "829344802157236";
// const facebookAppSecret = "fa7e3b4a612d6dfb888b6d91366f3871";
// const facebookCallbackURL =
//   "https://helpdesk-facebook.onrender.com/api/hook/getWebHook";

// // Configure the Facebook strategy for Passport
// passport.use(new FacebookStrategy({
//     clientID: facebookAppId,
//     clientSecret: facebookAppSecret,
//     callbackURL: facebookCallbackURL,
//   },
//   (accessToken, refreshToken, profile, done) => {
//     // Profile contains user information, and accessToken is the user's access token.
//     // You can save this information to your database or use it for API requests.
//     return done(null, profile);
//   }
// ));

// // Serialize and deserialize user information (for session management)
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
// app.get("/log", (req, res) => {
//   res.redirect("/auth/facebook");
// });

// // Facebook authentication route
// app.get("/auth/facebook", passport.authenticate("facebook"));

// // Facebook callback route
// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/profile",
//     failureRedirect: "/log",
//   })
// );

// // Profile route (accessible after successful authentication)
// app.get("/profile", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send("Welcome, " + req.user.displayName);
//   } else {
//     res.redirect("/login");
//   }
// });

// // Logout route
// app.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

//=---------------------------------passport end --------------------------------------------------------------------

console.log('working')
const connectDB = require('./config');
connectDB();

app.listen(5000)