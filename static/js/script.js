// const ipAddress = require("../../server.js")

// console.log(ipAddress);
// const showChatButton = document.querySelector("main section:nth-child(2) button")
const body = document.querySelector("body")
// const popup1 = document.querySelector("main section:first-child")
// const popup2 = document.querySelector("main section:nth-child(2)")

const chatPlace = document.querySelector(".chatPlace")
const chatTemplate = document.querySelector(".chatTemplate")

const contactsList = document.querySelector(".contacts-list")
const template = document.querySelector(".listTemplate")

const yourId = 23892
// get your id from the database

// get contact list form database
let personsArray = []
const addPerson = (name, lastName, pfPicture, id) => {
    const person = new People(name, lastName, pfPicture, id)
    personsArray.push(person)
}
const createAllContacts = () => {
    addPerson("Joe", "Roger", "images/pfpicture.png", 23123)
    addPerson("Frank", "Skinson", "images/pfpicture.png", 13242)
    addPerson("Lizz", "Balbla", "images/pfpicture.png", 78373)
    addPerson("John", "Paddington", "images/pfpicture.png", 80282)
    addPerson("Meteo", "Stars", "images/pfpicture.png", 73982)
    addPerson("Bob", "Bobbert", "images/pfpicture.png", 69173)
}

const duplicateTemplate = () => {
    personsArray.map((person) => {
        // create contact list form list out the database
        const tableHTML = template.content.firstElementChild.cloneNode(true)
        const placeName = tableHTML.querySelector("li a p")
        placeName.textContent = `${person.name} ${person.lastName}`
        const placePfPicture = tableHTML.querySelector("li a img")
        placePfPicture.src = person.pfPicture
        const idOfList = tableHTML.querySelector("a")
        idOfList.id = person.id
        contactsList.appendChild(tableHTML)
    })
}

const getChatFromContact = () => {
    const contactListLink = document.querySelectorAll("main nav a")
    contactListLink.forEach((list) => {
        //duplicate
        const chatHTML = chatTemplate.content.firstElementChild.cloneNode(true)
        chatHTML.id = `${list.id}` * `${yourId}`
        // console.log(chatHTML.id)
        chatPlace.appendChild(chatHTML)
        chatHTML.style.display = "none"

        personsArray.map((person) => {
            // fill in the template
            const nameFromId = chatHTML.querySelector("div:nth-child(1) h2")
            if (person.id == list.id) {
                nameFromId.textContent = `${person.name} ${person.lastName}`
                const pfPicture = chatHTML.querySelector("img")
                pfPicture.src = person.pfPicture
            }
        })

        list.addEventListener("click", () => {
            // open chat
            // console.log(chatHTML.id, `${list.id}` * `${yourId}`, `${yourId}` * `${list.id}`)
            if (chatHTML.id == `${list.id}` * `${yourId}`) {
                const chats = document.querySelectorAll("main .chatPlace > div")
                // const noChatOpend = chatPlace.querySelector("h2")
                chats.forEach((chat) => {
                    chat.style.display = "none"
                })
                // noChatOpend.style.display = "none"
                chatHTML.style.display = "flex"
            }
            // get chat from database?
        })
    })
}

const sendMassage = () => {
    const textField = chatPlace.querySelectorAll("div div:nth-child(3) input")
    const massageField = chatPlace.querySelector(" div div:nth-child(2)")
    textField.forEach((field) => {
        field.addEventListener("change", (e) => {
            const chatRow = document.createElement("div")
            const chat = document.createElement("p")
            massageField.appendChild(chatRow)
            chatRow.appendChild(chat)
            chat.textContent = e.target.value
            if (yourId === 23892) {
                chatRow.style.justifyContent = "flex-end"
            } else {
                chatRow.style.justifyContent = "flex-start"
            }
            if (field.value != "") {
                field.value = ""
            }
        })
    })
}

switch (body.id) {
    case "home":
    case "mainHandlebars":
        createAllContacts()
        duplicateTemplate()
        getChatFromContact()
        sendMassage()
        break
    default:
        console.error("this id is not supported")
        break
}

// TODO: (woensdag middag)
// - backend hw => meer proberen met handlebars, (dingen includen etc)
// - wiki onderzoek bijwerken
// - inlezen in socket.io

// const User = mongoose.model('User', new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     },
//     email: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 255,
//         unique: true
//     },
//     password: {
//         type: String,
//         // required: true,
//         minlength: 5,
//         maxlength: 1024
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     }
// }));

// showChatButton.addEventListener("click", () => {
//     popup1.style.display = "none"
//     popup2.style.display = "none"
// })

// popup animation
// setTimeout(() => {
//     popup1.style.display = "flex"
// }, 1000)
// setTimeout(() => {
//     popup2.style.display = "flex"
// }, 3000)
// setTimeout(() => {
//     popup1.style.display = "none"
//     popup2.style.display = "none"
// }, 8000)
