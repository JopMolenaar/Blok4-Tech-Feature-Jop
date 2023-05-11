const name = require("./static/js/name.js")
const express = require("express")
const { MongoClient } = require("mongodb")
const { MONGO_URI } = require("/Users/jopmolenaar/Documents/Blok4-Tech-Feature-Jop/.env")
const client = new MongoClient(MONGO_URI)
const slug = require("slug")
const app = express()
const PORT = process.env.PORT || 3000
const path = require("path")
// let ipAddress
const testLink = "Swipe area"

// const add = (req, res) => {
//     var message = slug("req.body.message")
//     console.log("im running")
//     data.push({
//         massage: req.body.message,
//     })
//     res.redirect("/", +message)
// }

async function run() {
    try {
        const database = client.db("test")
        const messages = database.collection("test")
        // Query for a movie that has the title 'Back to the Future'
        const query = { title: "Back to the Future" }
        const hello = await messages.findOne(query)
        console.log(hello)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close()
    }
}
run().catch(console.dir)

const { engine } = require("express-handlebars")
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(express.static(path.join(__dirname, "/static")))
    .use(express.urlencoded({ extended: true }))
    .get("/", (req, res) => {
        const ipAddress = req.socket.remoteAddress
        module.exports = ipAddress
        console.log(ipAddress)
        // res.send(ipAddress);

        res.render("home", { linkOne: testLink })
    })
// .get("/add", form)
// .post("/message", add)

app.get("/about", (req, res) => {
    res.send(`About ${name()}`)
})

app.get("/login", (req, res) => {
    res.send(`Log in ${name()}`)
})

app.get("*", (req, res) => {
    // res.render('home')
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
