TMDB_API_KEY = "972fc764bfdda5b9d34821a243adc607"
account_id = 20574151

const express = require('express');
// const requests = require('request');
const mysql = require('mysql');

const app = express();
const path = require('path');
const router = express.Router();

var con = mysql.createConnection(
  {
    host: "btqwfrkhhohfbtds6c9u-mysql.services.clever-cloud.com",
    user: "uj2tscyupyps9mg4",
    password: "LPJarBB9v1OuuA9dwMpD",
    database: "btqwfrkhhohfbtds6c9u"
  }
);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "select * from Subcription";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
});

function callexternalapi(movie_id)
{
  // use quote ` ${ thing we need }`
  let url = `https://api.themoviedb.org/3/search/movie?query=${movie_id}&api_key=${TMDB_API_KEY}`;
  // built-in fetch function
  fetch(url).then((res) => {
    res.json().then((res1) => {
      console.log(res1);
      return res1;
    })
  })
}

// render html file on route, express 1 way
// app.use('/',express.static(path.join(__dirname + '/templates'))); // it would take the index.html file to render

// app.use('/movieWatch', express.static(path.join(__dirname + '/templates')));

app.set("views", __dirname + "/views"); // or any other template engine you prefer
app.engine("html", require('ejs').renderFile);
app.set("view engine", "ejs");

// use everything, every folder for .css and .html
app.use(express.static(__dirname));

// just a sample
var movie_data = {
  title: 'Mission Impossible 5',
  detail: 'let get this party started'
};

// a better way, better than using the express itself but this is still express required
app.get('/', (req, res) => {
  res.render('UI', {movie_data: movie_data}); // UI.ejs dont worry it still html itself
})

// use to receive data from given stuff, still not working at the moment
app.post('/', (req, res) => {
  const movie_name = req.body.lender;
  console.log(movie_name);
  // Process the received data
  console.log(`Received data: lender: ${lender}, borrower: ${borrower}, amount: ${amount}`);
  movie_data = callexternalapi(movie_name);
});

// error screen here
app.use((req,res) => {
  res.status(404);
  res.send("<h1>THERE NOTHING HERE OK</h1>");
})
 
//add the router
app.listen(3000, () => {
  console.log("http://localhost:3000");
  console.log("data sample of a movie from MOVIE_DB api");
  callexternalapi("The Northman");

  var sql = "select * from Genre";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

});