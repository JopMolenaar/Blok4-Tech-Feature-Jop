const name = require("./static/js/name.js")
const express = require("express")
const { MongoClient } = require("mongodb")
const { MONGO_URI } = require("/Users/jopmolenaar/Documents/Blok4-Tech-Feature-Jop/.env")
const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
client.connect()
const slug = require("slug")
const multer = require("multer")
const app = express()
const PORT = process.env.PORT || 3000
const path = require("path")
const mongoose = require("mongoose")
const { engine } = require("express-handlebars")

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")
app.use(express.static(path.join(__dirname, "/static")))
app.use(express.urlencoded({ extended: true }))

// home page
const testLink = "Swipe area"
app.get("/", async (req, res) => {
    const ipAddress = req.socket.remoteAddress
    module.exports = ipAddress
    console.log(ipAddress)
    // res.send(ipAddress);
    try {
        const database = client.db("test")
        const userCollection = database.collection("users")
        console.log("getting users")
        // const projection = {
        //     _id: 0,
        //     name: 1,
        // }
        const getUser = await userCollection.find().toArray()
        // .project(projection)
        console.log("results van getuser;", getUser)
        res.render("home", { linkOne: testLink, result: getUser })
    } catch (err) {
        console.log(err)
    } finally {
        console.log("finally")
    }
})

app.get("/about", (req, res) => {
    res.send(`About ${name()}`)
})

app.get("/login", (req, res) => {
    res.send(`Log in ${name()}`)
})

app.get("*", (req, res) => {
    res.status(404).render("notfound")
})

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})

// req.params
// req.body
// req.query
// req.file

//deze dingen hierboven opzoeken

// const add = (req, res) => {
//     var message = slug("req.body.message")
//     console.log("im running")
//     data.push({
//         massage: req.body.message,
//     })
//     res.redirect("/", +message)
// }
