const name = require("./js/name.js")
const express = require('express')
const app = express()

app
  .use(`/static`, express.static(`static`))
  .get('/', function (req, res) {
    res.send(`Hello World ${name()} `)
  })

app.get('/about', function (req, res) {
  res.send(`About ${name()} `)
})

app.get('/login', function (req, res) {
  res.send(`Log in ${name()} `)
})

app.listen(3000)