console.log("cnownoicnwoi");

const hobbySix = document.createElement("li")
const theList = document.querySelector("ul")
hobbySix.textContent = "poepen"
theList.appendChild(hobbySix)

const listItems = document.querySelectorAll("ul li")
console.log(listItems);

listItems.forEach((li)=>{
console.log(li.innerHTML);
})