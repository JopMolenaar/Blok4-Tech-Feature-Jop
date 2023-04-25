const name = require("./static/js/name.js")
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000
const path = require('path');

const { engine } = require("express-handlebars");
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, '/static')));
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/about', (req, res) => {
  res.send(`About ${name()} `)
})

app.get('/login', (req, res) => {
  res.send(`Log in ${name()} `)
})

app.get(`*`, (req, res) => {
  res.status(404).send('Error 404');
})

app.listen(PORT, () =>{
console.log(`server running on port: ${PORT}`);
})

