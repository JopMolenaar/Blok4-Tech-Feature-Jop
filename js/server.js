const sum = require("./jop.js")
console.log(sum())

console.log("Hello World");

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World Jop')
})

app.listen(3000)