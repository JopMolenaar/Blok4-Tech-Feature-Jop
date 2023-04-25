const name = require("./js/name.js")
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send(`Hello World ${name()} `)
})

app.listen(3000)