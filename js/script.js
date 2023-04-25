const showChatButton = document.querySelector("main section:nth-child(2) button")
const body = document.querySelector("body")
const popup1 = document.querySelector("main section:first-child")
const popup2 = document.querySelector("main section:nth-child(2)")

const yourId = 23892
// get your id from the database

// get contact list form database
let personsArray = []
function addPerson(name, lastName, pfPicture, id){
    const person = new People(name, lastName, pfPicture, id);
    personsArray.push(person) 
}
function createAllContacts(){
  addPerson("Joe", "Roger", "images/pfpicture.png", 23123)
  addPerson("Frank", "Skinson", "images/pfpicture.png", 13242)
  addPerson("Lizz", "Balbla", "images/pfpicture.png", 78373)
  addPerson("John", "Paddington", "images/pfpicture.png", 80282)
  addPerson("Meteo", "Stars", "images/pfpicture.png", 73982)
  addPerson("Bob", "Bobbert", "images/pfpicture.png", 69173)
}

function duplicateTemplate(){
    personsArray.map((person)=>{
        // create contact list form list out the database
        const contactsList = document.querySelector(".contacts-list")
        const template = document.querySelector(".listTemplate")
        const tableHTML = template.content.firstElementChild.cloneNode(true);
        const placeName = tableHTML.querySelector("li a p")
        placeName.textContent = `${person.name} ${person.lastName}`
        const placePfPicture = tableHTML.querySelector("li a img")
        placePfPicture.src = person.pfPicture
        const idOfList = tableHTML.querySelector("a")
        idOfList.id = person.id
        contactsList.appendChild(tableHTML);
    })
}

function getChatFromContact (){
    const contactListLink = document.querySelectorAll(`main nav a`)
    contactListLink.forEach((list) => {
        //duplicate
        const chatPlace = document.querySelector(".chatPlace")
        const chatTemplate = document.querySelector(".chatTemplate")
        const chatHTML = chatTemplate.content.firstElementChild.cloneNode(true);
        chatHTML.id = `${list.id}${yourId}`
        chatPlace.appendChild(chatHTML);
        chatHTML.style.display = "none"

        personsArray.map((person)=>{
            // fill in the template
            const nameFromId = chatHTML.querySelector("div:nth-child(1) h2")
            if(person.id == list.id){
                nameFromId.textContent = `${person.name} ${list.id}${yourId}`
            }



        })
    
        list.addEventListener(`click`, () => {
            // open chat
            if(chatHTML.id === `${list.id}${yourId}`){
                const chats = document.querySelectorAll("main .chatPlace > div")
                chats.forEach((chat) => {
                    chat.style.display = "none"
                })
                chatHTML.style.display = "flex"
            }
            // get chat from database?
        })
    })    
}

switch (body.id) {
    case "home":    
        createAllContacts()
        duplicateTemplate()
        getChatFromContact()
        showChatButton.addEventListener("click", ()=>{
            popup1.style.display = "none"
            popup2.style.display = "none"
        })

        // popup animation
        setTimeout(() =>{
            popup1.style.display = "flex"
         }, 1000)
         setTimeout(() =>{
            popup2.style.display = "flex"
         }, 3000)
         setTimeout(() =>{
            popup1.style.display = "none"  
            popup2.style.display = "none"
         }, 8000)
        break;
    default:
        console.error("this id is not supported");
        break;
}



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
