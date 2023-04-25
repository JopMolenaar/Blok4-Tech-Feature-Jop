const name = require("./js/name.js")
const express = require('express')
const app = express();
const PORT = process.env.PORT || 1337


const  { create } = require("express-handlebars");

const hbs = create({ /* config */ });

// Register `hbs.engine` with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './view');


app.get('/', function (req, res) {
    // res.render(`index`)
    res.send(`Hoi ${name()} `)
  })

app.get('/about', function (req, res) {
  res.send(`About ${name()} `)
})

app.get('/login', function (req, res) {
  res.send(`Log in ${name()} `)
})



app.get(`*`, function (req, res) {
  res.status(404).send('Error 404');
})

app.listen(PORT, () =>{
console.log(`server running on port: ${PORT}`);
})

app.listen(3000)
