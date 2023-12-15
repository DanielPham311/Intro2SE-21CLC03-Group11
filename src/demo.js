// demo use of Account model
// model.Account.getAccountById(12).then(res =>{
//     if (res == null)
//     {
//         console.log("No account with this id is found");
//         return
//     }
//     const Acc = res.dataValues;
//     console.log("This is the id: " + Acc.account_id);
//     console.log("The account has username called: " + Acc.username);
// })

// model.Account.getAccountByUsername('austinmanning').then(res => {
//     console.log(res.dataValues);
// })

// Account will automatically hash the password so dont worry
// model.Account.createAccount('dinhquangphong','password123','user','dinhquangphong365@gmail.com'); // there will be User account and Subscription Plan record for the user


// model.Account.verifyAccount('dinhquangphong','password123').then(res => {
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

// model.Genre.getGenreById(2).then(res => {
//     console.log(res.dataValues);
// })