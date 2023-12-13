const express = require('express');
const model = require('./models');
const PORT = process.env.PORT || 8080;
const app = express();

// start connecting to database
// model.sequelize.sync().then(() => {
//     model.Account.findAll().then(res => {
//         const dataValuesArray = res.map(account => account.dataValues);
//         console.log(dataValuesArray);
//     })

//     model.Account.getAccountById(5).then(res => {
//         const dataValuesArray = res.dataValues;
//         console.log(dataValuesArray);
//     })    
// })

model.Account.getAccountById(5).then(res =>{
    const Acc = res.dataValues;
    console.log("This is the id: " + Acc.account_id);
    console.log("The account has username called: " + Acc.username);
})

model.Account.getAccountByUsername('austinmanning').then(res => {
    console.log(res.dataValues);
})

// Account will automatically hash the password so dont worry
model.Account.createAccount('dinhquangphong','password123','user','dinhquangphong365@gmail.com'); 

// model.Account.updateAccount(11, {email: 'wearetheone@gmail.com'}); // update other stuff like username, email, role
// model.Account.updateAccountPassword(11, 'we are the one'); // update password
// model.Account.deleteAccount(11);




//
app.use(express.static(__dirname+ '/static'));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.send("Hello world!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    
  });