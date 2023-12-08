var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dinhquangphong365@gmail.com',
    pass: process.env.MY_APP_PASS // secret password I dont even know :33, but I know where to find it
  }
});

var mailOptions = {
  from: 'dinhquangphong365@gmail.com',
  to: 'dqphong21@clc.fitus.edu.vn',
  subject: 'Node.js Email sending test bruhhh',
  // text: 'OTP 1213423432425254 SIUUUUU '
  html: `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <!-- <link rel="shortcut icon" type="x-icon" href="ship.png"> -->
      <!-- "{{ url_for('static', filename='UI.css') }}"> -->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Netflex</title>
      <link rel="shortcut icon" type="image/jpg" href="../static/icon.png">
      <link rel="stylesheet" type="text/css" href="static/UI.css"> <!--it work for javascript -->
  </head>
  <body>
      <div class="header">
          <h1>NETFLEX demo test</h1>
          <h3>Phần dưới là cách một movie_data dc thể hiện </h3>
          <p> <%= movie_data.title %> is the name of the movie, <%= movie_data.detail %></p>
      </div>
      <div class="circle">
          <div class="row">
              <div class="col-6 mx-auto mt-5">
                  <form action="">
                      <h2></h2>
                  </form>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="col-6 mx-auto mt-5">
                  <form action="/" method="POST"> <!--action for each web page -->
                      <label for="lender">The power of coding is here</label>
                      
                      <div class="input-group mb-3">
                          <span class="input-group-text" id="basic-addon3">Tìm phim </span>
                          <input type="text" class="form-control" id="lender" aria-describedby="basic-addon3"
                              name="lender" autocomplete="off">
                      </div>
                      <!-- <button class="btn btn-primary">Chốt phim maybe</button> -->
                  </form>
              </div>
          </div>
      </div>
      <!-- <div class="container">
          <div class="row">
              <div class="col-6 mx-auto mt-5">
                  <form action="">
                      <button class="btn btn-outline-info">Check</button>
                  </form>
              </div>
          </div>
      </div> -->
  </body>
  
  </html>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response + " its good ok");
  }
});