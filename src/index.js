const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const expressHbs = require('express-handlebars');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require('passport');
const authenticateRoute = require('./routers/authenRouter');

// set the view engine
app.engine('hbs', expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialDir: __dirname + "/views/partials",
    defaultLayout: "layout",
    extname: "hbs",
}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/static'));

// Cau hinh cho phep doc du lieu gui len bang phuong thuc POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser("COOKIE_SECRET"));

// THiết lập sử dụng session và lưu trữ session trên redis
app.use(
  session(
    {
      secret: "SESSION_SECRET",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: true, // prevent client side js from reading the cooking
        maxAge: 1000 * 60 * 60 // maximum age 1 hour
      }
    }
  )
);

/*
PASSPORT AUTHENTICATION
*/
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(authenticateRoute);


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/static/html/index.html');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });