// const name = require("./static/js/name.js")
const express = require("express")
const { MongoClient } = require("mongodb")
const { MONGO_URI } = require("/Users/jopmolenaar/Documents/Blok4-Tech-Feature-Jop/.env")
const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
client.connect()
// const xss = require("xss")
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
const upload = multer({ dest: "static/upload/" })

// const getDogPics = async () => {
//     const res = await fetch("https://random.dog/c5a493db-526c-4563-9e97-f12b36d592d6.jpg")
//     return await res.json()
// }
// app.get(`/:id`, async (req, res) => {
//     try {
//         // const getPfPics = await getDogPics()
//         console.log("getting dog pictures")
//         const database = client.db("test")
//         const userCollection = database.collection("users")
//         console.log("getting users")
//         const getUser = await userCollection.find(new ObjectId(req.params.id)).toArray()
//         console.log("results van getuser;", getUser)
//         // pfPictures: getPfPics
//         res.render("home", { result: getUser })
//     } catch (err) {
//         console.log(err)
//     } finally {
//         console.log("finally getSpecificUserPage")
//     }
// })

app.get("/locations", async (req, res) => {
    //slurp de database leeg voor locaties
    try {
        const database = client.db("db_locations")
        const userCollection = database.collection("locations")
        console.log("getting locations")
        const getLocations = await userCollection.find().toArray()
        console.log("locations:", getLocations)
        // get weather api search for country.city en give that info
        res.render("locations", { result: getLocations })
    } catch (err) {
        console.log(err)
    } finally {
        console.log("finally getLocations")
    }
})

const add = async (req, res) => {
    try {
        let data = []
        const database = client.db("db_locations")
        const dbLocations = database.collection("locations")
        const getLocations = await dbLocations.find().toArray()
        const adressForClass = slug(req.body.adress).replace(/[^a-zA-Z]/g, "")
        const setup = slug(req.body.setup)
            .replace(/\d+|^\s+|\s+$/g, "")
            .split("-")
            .join(" ")
            .split(" en ")
            .join(" ")

        data.push({
            country: req.body.country,
            city: req.body.city,
            adress: req.body.adress,
            adressForClass: adressForClass,
            img: req.file ? req.file.filename : null,
            discription: req.body.discription,
            setup: setup,
        })
        console.log("data", data[0])
        // let done = false
        // getLocations.forEach((location) => {
        //     if ((location.adress = !data.adress && done === false)) {
        //         const addLocations = dbLocations.insertOne(data[0])
        //         console.log("added:", addLocations)
        //         console.log("set")
        //     } else {
        //         done = true
        //         console.log("done")
        //     }
        // })
        const addLocations = await dbLocations.insertOne(data[0])
        console.log("added:", addLocations)
        res.redirect("/locations")
    } catch (error) {
        console.log(error)
    } finally {
        console.log("added location")
    }
}
app.post("/add-locations", upload.single("img"), add)

app.get("/locations/add", async (req, res) => {
    res.render("addLocations")
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
