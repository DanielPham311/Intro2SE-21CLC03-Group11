const express = require('express');


const PORT = process.env.PORT || 8080;
const app = express();

//
app.use(express.static(__dirname));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.send("Hello world!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });