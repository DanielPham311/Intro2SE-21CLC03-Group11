const express = require('express');
const db = require('./models');
const PORT = process.env.PORT || 8080;
const app = express();

// start connecting to database
db.sequelize.sync().then(() => {
    db.models.Subscription.findAll().then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


//
app.use(express.static(__dirname+ '/static'));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.send("Hello world!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    
  });