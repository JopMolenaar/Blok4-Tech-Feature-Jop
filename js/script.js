const showChatButton = document.querySelector("main section:nth-child(2) button")
const body = document.querySelector("body")
const popup1 = document.querySelector("main section:first-child")
const popup2 = document.querySelector("main section:nth-child(2)")

let personsArray = []
function addPerson(name, lastName, pfPicture){
    const person = new People(name, lastName, pfPicture);
    personsArray.push(person) 
}
function createAllContacts(){
  addPerson("Joe", "Roger", "images/pfpicture.png")
  addPerson("Frank", "Skinson", "images/pfpicture.png")
  addPerson("Lizz", "Balbla", "images/pfpicture.png")
  addPerson("John", "Paddington", "images/pfpicture.png")
  addPerson("Meteo", "Stars", "images/pfpicture.png")
  addPerson("Bob", "Bobbert", "images/pfpicture.png")
}

function duplicateTemplate(){
    personsArray.map((person)=>{
        const contactsList = document.querySelector(".contacts-list")
        const template = document.querySelector("template")
        const tableHTML = template.content.firstElementChild.cloneNode(true);
        const placeName = tableHTML.querySelector("li a p")
        placeName.textContent = `${person.name} ${person.lastName}`
        const placePfPicture = tableHTML.querySelector("li a img")
        placePfPicture.src = person.pfPicture
        const idOfList = tableHTML.querySelector("a")
        idOfList.id = person.getLowerCaseID()
        contactsList.appendChild(tableHTML);
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
