// const showChatButton = document.querySelector("main section:nth-child(2) button")
const body = document.querySelector("body")
// const popup1 = document.querySelector("main section:first-child")
// const popup2 = document.querySelector("main section:nth-child(2)")
const chatPlace = document.querySelector(".chatPlace")
const contactsList = document.querySelector(".contacts-list")

const getChatFromContact = () => {
    const contactListLink = document.querySelectorAll("main nav a")
    contactListLink.forEach((list) => {
        list.addEventListener("click", () => {
            // open chat
            const chats = document.querySelectorAll("main .chatPlace > div")
            chats.forEach((chat) => {
                chat.style.display = "none"
                if (list.classList == chat.id) {
                    chat.style.display = "flex"
                }
            })
            // get chat from database?
        })
    })
}

const sendMessage = () => {
    const textField = chatPlace.querySelectorAll("div div:nth-child(3) input")
    const messageFields = chatPlace.querySelectorAll("div > div:nth-child(2)")
    textField.forEach((field) => {
        field.addEventListener("change", (e) => {
            const chatRow = document.createElement("div")
            const chat = document.createElement("p")
            messageFields.forEach((messageField) => {
                const parent = field.parentElement
                if (messageField.parentElement === parent.parentElement) {
                    messageField.appendChild(chatRow)
                    chatRow.appendChild(chat)
                    chat.textContent = e.target.value
                }
            })
            // if (yourId === 23892) {
            //     chatRow.style.justifyContent = "flex-end"
            // } else {
            //     chatRow.style.justifyContent = "flex-start"
            // }
            if (field.value != "") {
                field.value = ""
            }
        })
    })
}

switch (body.id) {
    case "home":
    case "mainHandlebars":
        getChatFromContact()
        sendMessage()
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
