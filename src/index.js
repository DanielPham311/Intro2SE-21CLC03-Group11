const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const expressHbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const authenticateRoute = require("./routers/authenRouter");
const { isAuth, isAdmin } = require("./middlewares/authenticateMiddleware");
const path = require("path");
const AppRouter = require("./routers/AppRouter");
const MovieRouter = require("./routers/WatchMovieRouter");
const ApiRouter = require('./routers/ApiRouter');

// set the view engine
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialDir: __dirname + "/views/partials",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      half: function (a) {
        return Math.round(a / 2);
      },
      Array: function (len) {
        let array = [];
        for (let i = 0; i < len; ++i) {
          array.push(i);
        }
        return array;
      },
    },
  })
);

app.set("view engine", "hbs");

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "static")));

// Cau hinh cho phep doc du lieu gui len bang phuong thuc POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("COOKIE_SECRET"));

// THiết lập sử dụng session và lưu trữ session trên redis
app.use(
  session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: true, // prevent client side js from reading the cooking
      maxAge: 1000 * 60 * 60, // maximum age 1 hour
    },
  })
);

/*
PASSPORT AUTHENTICATION
*/
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(authenticateRoute);
app.use(ApiRouter);
app.use(isAuth);
app.use((req, res, next) => {
  const user = req.user;
  res.locals.user = user || {
    user_id: 999,
    name: "Guest",
    age: 18,
    birthday: "2023-12-02",
    parental_mode: 0,
  };
  next();
});
app.use(AppRouter);
app.use("/watch", MovieRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
