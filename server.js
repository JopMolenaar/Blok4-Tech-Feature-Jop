const express = require("express")
const { MongoClient } = require("mongodb")
const { MONGO_URI } = require("/Users/jopmolenaar/Documents/Blok4-Tech-Feature-Jop/.env")
const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
client.connect()
const path = require("path")
const slug = require("slug")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "static/upload/")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    },
})
const upload = multer({ storage: storage })
const app = express()
const PORT = 3000
const mongoose = require("mongoose")
const { engine } = require("express-handlebars")
const ObjectId = require("mongodb").ObjectId

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")
app.use(express.static(path.join(__dirname, "/static")))
app.use(express.urlencoded({ extended: true }))

app.get("/locations", async (req, res) => {
    try {
        const database = client.db("db_locations")
        const userCollection = database.collection("locations")
        console.log("getting locations")
        const getLocations = await userCollection.find().toArray()
        console.log("locations:", getLocations)
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
        let doubleLocationsArray = []
        const database = client.db("db_locations")
        const dbLocations = database.collection("locations")
        const getLocations = await dbLocations.find().toArray()
        console.log(getLocations)
        getLocations.forEach((location) => {
            doubleLocationsArray.push(`${location.country}, ${location.city}, ${location.adress}`)
        })
        const country = slug(req.body.country).replace(/[^a-zA-Z]/g, "")
        const city = slug(req.body.city).replace(/[^a-zA-Z]/g, "")
        const adress = slug(req.body.adress).replace(/[^a-zA-Z]/g, "")
        const adressForClass = slug(req.body.adress).replace(/[^a-zA-Z]/g, "")
        const discription = slug(req.body.discription).split("<", "")
        data.push({
            country: country,
            city: city,
            adress: adress,
            adressForClass: adressForClass,
            coordinates: req.body ? req.body.coordinates : null,
            img: req.file ? req.file.filename : null,
            discription: discription,
            setup: {
                highbar: req.body.highbar,
                mediumbar: req.body.mediumbar,
                lowbar: req.body.lowbar,
                dipbars: req.body.dipbars,
                ladder: req.body.ladder,
                pole: req.body.pole,
            },
        })
        if (doubleLocationsArray.includes(`${data[0].country}, ${data[0].city}, ${data[0].adress}`)) {
            const errorExists = "Location already exists"
            res.render("addLocations", { error: errorExists })
        } else {
            console.log("data", data[0])
            const addLocations = await dbLocations.insertOne(data[0])
            console.log("added:", addLocations)
            res.redirect("/locations")
        }
    } catch (error) {
        console.log(error)
    } finally {
        console.log("added location")
    }
}
app.post("/locations/add", upload.single("image"), add)

app.get("/locations/add", async (req, res) => {
    res.render("addLocations")
})

app.get("*", (req, res) => {
    res.status(404).render("notfound")
})

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
