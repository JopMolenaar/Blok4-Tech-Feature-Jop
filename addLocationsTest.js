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
        const database = client.db("db_locations")
        const dbLocations = database.collection("locations")
        const locations = [
            {
                country: "Netherlands",
                city: "Haarlem",
                adress: "Noordersportpark 72",
                img: "url",
                discription: "Nice place in a park",
                setup: ["2 Highbars", "dip bars"],
            },
            {
                country: "Netherlands",
                city: "Amsterdam",
                adress: "Westergrachtpark 3",
                img: "url",
                discription: "Big place next to the trainrails",
                setup: ["2 Highbars", "dip bars", "Ladder", "3 lowbars"],
            },
        ]
        const addLocations = await dbLocations.insertMany(locations)
        console.log(addLocations)
    } catch (err) {
        console.log(err)
    } finally {
        console.log("finally")
    }
}
run().catch(console.dir)
