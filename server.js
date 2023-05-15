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
const ObjectId = require("mongodb").ObjectId

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
        const getUser = await userCollection.find().toArray()
        console.log("results van getuser;", getUser)
        res.render("home", { linkOne: testLink, result: getUser })
    } catch (err) {
        console.log(err)
    } finally {
        console.log("finally get home")
    }
})

//login page
app.get("/login", async (req, res) => {
    try {
        const database = client.db("test")
        const userCollection = database.collection("users")
        console.log("getting users for login")
        const getUser = await userCollection.find().toArray()
        console.log("results van getuser for login;", getUser)

        res.render("choose", { result: getUser })
    } catch (err) {
        console.log(err)
    } finally {
        console.log("finally getLoginPage")
    }
})

app.get(`/:id`, async (req, res) => {
    try {
        const database = client.db("test")
        const userCollection = database.collection("users")
        console.log("getting users")
        const getUser = await userCollection.find(new ObjectId(req.params.id)).toArray()
        console.log("results van getuser;", getUser)
        res.render("home", { result: getUser })
    } catch (err) {
        console.log(err)
    } finally {
        console.log("finally getSpecificUserPage")
    }
})

app.get("/about", (req, res) => {
    res.send(`About ${name()}`)
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
