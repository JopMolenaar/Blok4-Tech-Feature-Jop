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

const run = async () => {
    try {
        const database = client.db("test")
        const messages = database.collection("users")
        const users = [
            { name: "Joe", lastname: "Roger", pfPicture: "images/pfpicture.png" },
            { name: "Frank", lastname: "Skinson", pfPicture: "images/pfpicture.png" },
            { name: "Lizz", lastname: "Balbla", pfPicture: "images/pfpicture.png" },
            { name: "John", lastname: "Paddington", pfPicture: "images/pfpicture.png" },
            { name: "Meteo", lastname: "Stars", pfPicture: "images/pfpicture.png" },
            { name: "Bob", lastname: "Bobbert", pfPicture: "images/pfpicture.png" },
        ]
        const addUser = await messages.insertMany(users)
        console.log(addUser)
    } catch (err) {
        console.log(err)
    } finally {
        console.log("finally")
    }
}
run().catch(console.dir)
