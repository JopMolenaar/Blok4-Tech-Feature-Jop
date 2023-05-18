const body = document.querySelector("body")
const filterNav = document.querySelector("#locations section")
const locationsList = document.querySelector("#locations ul")
console.log(filterNav, locationsList)

switch (body.id) {
    case "home":
    case "mainHandlebars":
        break
    default:
        console.error("this id is not supported")
        break
}
