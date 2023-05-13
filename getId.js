const express = require("express")
const { MongoClient } = require("mongodb")
const { MONGO_URI } = require("/Users/jopmolenaar/Documents/Blok4-Tech-Feature-Jop/.env")
const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
client.connect()
const app = express()
const PORT = process.env.PORT || 3000
const path = require("path")
const mongoose = require("mongoose")
const { engine } = require("express-handlebars")
const ObjectId = require("mongodb").ObjectId
// var id = req.params.gonderi_id
// var o_id = new ObjectId(id)

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")
app.use(express.static(path.join(__dirname, "/static")))
app.use(express.urlencoded({ extended: true }))

// get id's form every user
let idInArray = []
let allIds = []
const getID = async () => {
    try {
        const database = client.db("test")
        const userCollection = database.collection("users")
        console.log("getting id's")
        const getId = await userCollection.find().toArray()
        console.log("results van getID;", getId)
        idInArray.push(getId)
        idInArray.forEach((idtje) => {
            idtje.forEach((id) => {
                idVar = `${id._id}`
                const onlyNmbr = idVar.replace("new ObjectId", "")
                if (allIds.includes(onlyNmbr) === false) {
                    allIds.push(onlyNmbr)
                }
            })
            console.log("all id array", allIds)
            // getSpecificUserPage()
            return allIds
        })
    } catch (err) {
        console.log(err)
    } finally {
        console.log("finally getID")
    }
}
// getID()

module.exports = getID
