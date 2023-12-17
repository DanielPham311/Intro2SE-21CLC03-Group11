const dbQuery = require('./services/dbQuery');
const auth = require('./services/Authentication_Service');
const model = require('./models');
// demo use of Account model

// model.Account.getAccountByUsername('austinmanning').then(res => {
//     console.log(res.dataValues);
// })

// Account will automatically hash the password so dont worry
// model.Account.createAccount('dinhquangphong','password123','user','dinhquangphong365@gmail.com'); // there will be User account and Subscription Plan record for the user


// model.Account.verifyAccount('johnhayes','pass100').then(res => {
//     if (res) {console.log("Successfully login");}
//     else {console.log("Incorrect username or password");}
// })

// model.Account.updateAccount(11, {email: 'wearetheone@gmail.com'}); // update other stuff like username, email, role
// model.Account.updateAccountPassword(11, 'we are the one'); // update password
// model.Account.deleteAccount(11);

// model.Award.findAll().then(res => {
//     console.log(res.map(res => res.dataValues));
// })

// const testFunc = require('./service/complexQuery');
// testFunc.getFreeSubscriptionUsernames().then(res =>{
//     console.log(res);
// })

// model.GenreMovie.getGenreOfMovie(10).then(res => {
//     console.log(res.map(res => res.dataValues));
// })

// dbQuery.getGenreOfMovie(10).then(res => {
//     console.log(res);
// })

// dbQuery.getAwardOfMovie(10).then(res => {
//     console.log(res);
// })

// model.Movie.findAll().then(res => {
//     console.log(res.map(res => res.dataValues));
// })

// model.Season.findAll().then(res => {
//     console.log(res.map(res => res.dataValues));
// })

// model.MovieTrailer.getMovieTrailer(10).then(res => {
//     console.log(res.map(res => res.dataValues));
// })

auth.createAccount('dinhquangphong','pass123','user','dinhquangphong365@gmail.com');

// ------------------------------TEST A BIT-------------------------
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
  
//   function askQuestion() {
//     readline.question('Please enter a number: ', (number) => {
//       if (number == 1) {
//         // model.Award.findAll().then(res => {
//         // console.log(res.map(res => res.dataValues));
//         // })
//         dbQuery.getFreeSubscriptionUsernames().then(res =>{
//         console.log(res);
//         })
//         model.Subscription.findAll().then(res => {
//             console.log(res.map(res => res.dataValues))
//         })

//       } else if (number == 2) {
//         // model.GenreMovie.getGenreOfMovie(10).then(res => {
//         //     console.log(res.map(res => res.dataValues));
//         // })
//         dbQuery.getGenreOfMovie(10).then(res => {
//         console.log(res);
//         })
//       } else if (number == 3){
//         dbQuery.getAwardOfMovie(10).then(res => {
//         console.log(res);
//         })
//       } else if (number == 4){
//         model.Movie.findAll().then(res => {
//         console.log(res.map(res => res.dataValues));
//         })
//       } else if (number == 5){
//         model.Season.findAll().then(res => {
//         console.log(res.map(res => res.dataValues));
//         })
//       } else if (number == 6){
//         model.Comment.findAll().then(res => {
//         console.log(res.map(res => res.dataValues));
//         })

//         model.WatchHistory.findAll().then(res => {
//             console.log(res.map(res => res.dataValues));
//         })

//         model.WatchList.findAll().then(res => {
//             console.log(res.map(res => res.dataValues));
//             })
//       } 
//       if (number != 0)
//         askQuestion(); // Ask the question again, recursively bruh
//     });
//   }
  
//   askQuestion(); // Start the questioning loop
