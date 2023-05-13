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
// var id = req.params.gonderi_id
// var o_id = new ObjectId(id)

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
        console.log("finally get home")
    }
})

// // get id's form every user
// let idInArray = []
// let allIds = []
// const getID = async () => {
//     try {
//         const database = client.db("test")
//         const userCollection = database.collection("users")
//         console.log("getting id's")
//         const getId = await userCollection.find().toArray()
//         console.log("results van getID;", getId)
//         idInArray.push(getId)
//         idInArray.forEach((idtje) => {
//             idtje.forEach((id) => {
//                 idVar = `${id._id}`
//                 const onlyNmbr = idVar.replace("new ObjectId", "")
//                 if (allIds.includes(onlyNmbr) === false) {
//                     allIds.push(onlyNmbr)
//                 }
//             })
//             console.log("all id array", allIds)
//             // getSpecificUserPage()
//         })
//     } catch (err) {
//         console.log(err)
//     } finally {
//         console.log("finally getID")
//     }
// }

// get userPage form /id url
//search that users contacts
// const getSpecificUserPage = async () => {
//     try {
let allIDsHopefully
let testBruh = [
    "645f75568e4b512f0a2f3e18",
    "645f75568e4b512f0a2f3e19",
    "645f75568e4b512f0a2f3e1a",
    "645f75568e4b512f0a2f3e1b",
    "645f75568e4b512f0a2f3e1c",
    "645f75568e4b512f0a2f3e1d",
]
const getID = require("./getId.js")
getID().then((allIDsHopefully = getID()))
console.log("hello?", getID())
// its promising and pending

// allIDsHopefully = await getID()

// getID().then(function (result) {
//     allIDsHopefully = getID()
//     console.log("result id's", result)
// })
testBruh.forEach((id) => {
    // allIds.forEach((id) => {
    // console.log("its empty", allIds)
    console.log("hard coded", id)
    app.get(`/${id}`, async (req, res) => {
        console.log("here is it full", getID())
        console.log("here is it full????", allIDsHopefully)
        try {
            const database = client.db("test")
            const userCollection = database.collection("users")
            console.log("getting users")
            const getUser = await userCollection.find(new ObjectId(`${id}`)).toArray()
            console.log("results van getuser;", getUser)
            res.render("home", { result: getUser })
        } catch (err) {
            console.log(err)
        } finally {
            console.log("finally getSpecificUserPage")
        }
    })
})
//     } catch (err) {
//         console.log(err)
//     } finally {
//         console.log("finally async")
//     }
// }

app.get("/about", (req, res) => {
    res.send(`About ${name()}`)
})

//login page
app.get("/login", async (req, res) => {
    try {
        // can be coded in less lines
        // getID()
        //

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
