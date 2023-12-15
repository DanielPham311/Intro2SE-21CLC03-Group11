const express = require('express');
const model = require('./models');
const PORT = process.env.PORT || 8080;
const app = express();
const expressHbs = require('express-handlebars');
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.static(__dirname + '/static'));

// set the view engine
app.engine('hbs', expressHbs({
    ext: 'hbs',
    fileDefaultLayout: 'layout',
    layoutDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}));

app.set('view engine', 'hbs');


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
      }
    }
  )
);

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/static/html/index.html');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });