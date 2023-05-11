const name = require("./static/js/name.js")
const express = require("express")
const { MongoClient } = require("mongodb")
const { MONGO_URI } = require("/Users/jopmolenaar/Documents/Blok4-Tech-Feature-Jop/.env")
const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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

// const add = (req, res) => {
//     var message = slug("req.body.message")
//     console.log("im running")
//     data.push({
//         massage: req.body.message,
//     })
//     res.redirect("/", +message)
// }

const run = async () => {
    try {
        await client.connect()
        const database = client.db("test")
        const messages = database.collection("users")
        const users = [
            { name: "Jop", lastname: "Molenaar", age: 18 },
            { name: "Bob", lastname: "Bakker", age: 15 },
        ]
        const addUser = await messages.insertMany(users)
        console.log(addUser)
        // const find = messages.find()
        // console.log(find)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}
run().catch(console.dir)

const testLink = "Swipe area"
app.get("/", (req, res) => {
    const ipAddress = req.socket.remoteAddress
    module.exports = ipAddress
    console.log(ipAddress)
    // res.send(ipAddress);

    res.render("home", { linkOne: testLink })
})

app.get("/add-message", async (req, res) => {
    try {
        await client.connect()
        const database = client.db("test")
        const userCollection = database.collection("users")
        console.log("getting users")

        // const results = await new Promise((resolve, reject) => {
        //     userCollection.find().toArray((err, results) => {
        //         if (err) reject(err)
        //         else resolve(results)
        //     })
        // })
        // console.log("got search")
        // res.send(results)

        userCollection.find().toArray((err, results) => {
            // find({"Jop": { $regex: req.query.inputCountry }})
            console.log("searching")
            res.send(results)
            // .render("add-message", { result: results })
        })
        console.log("hello, does it do something pls?")
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
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
