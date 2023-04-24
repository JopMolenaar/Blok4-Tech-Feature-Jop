const showChatButton = document.querySelector("main section:nth-child(2) button")
const body = document.querySelector("body")
const popup1 = document.querySelector("main section:first-child")
const popup2 = document.querySelector("main section:nth-child(2)")

const yourId = 23892

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
        const contactsList = document.querySelector(".contacts-list")
        const template = document.querySelector(".listTemplate")
        const tableHTML = template.content.firstElementChild.cloneNode(true);
        const placeName = tableHTML.querySelector("li a p")
        placeName.textContent = `${person.name} ${person.lastName}`
        const placePfPicture = tableHTML.querySelector("li a img")
        placePfPicture.src = person.pfPicture
        const idOfList = tableHTML.querySelector("a")
        idOfList.id = person.getLowerCaseID()
        contactsList.appendChild(tableHTML);

        console.log(person.id);
        console.log(`The chat id is ${person.id}${yourId}`)
    })
}

switch (body.id) {
    case "home":    
        createAllContacts()
        duplicateTemplate()

        showChatButton.addEventListener("click", ()=>{
            popup1.style.display = "none"
            popup2.style.display = "none"
        })

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



// const contactListLink = document.querySelectorAll(`main nav a`)
// contactListLink.forEach((list) => {
//     console.log(list.id);
// })
const firstContactListLink = document.querySelector(`main nav a`)
firstContactListLink.addEventListener(`click`, () => {
    // duplicate, and open chat with the chat number (user id + your id = chat id)
    console.log("id");
})
// de linkjes staan nog op #








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
