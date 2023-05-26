const allGoogleMapsLinks = document.querySelectorAll("#locations ul li a")
const allListItems = document.querySelectorAll("#locations ul li")

allGoogleMapsLinks.forEach((link) => {
    link.style.display = "none"
    link.style.top = "50%"
    link.style.right = "0%"
    link.style.left = "50%"
    link.style.transform = "translate(-50%, -50%)"
})
let active = false
allListItems.forEach((item) => {
    item.addEventListener("click", () => {
        const link = item.querySelector("a")
        if (link != undefined) {
            if (active === false) {
                link.style.display = "flex"
                console.log(link.href)
                active = true
                setTimeout(() => {
                    link.style.display = "none"
                    active = false
                }, 3000)
            } else if (active === true) {
                link.style.display = "none"
                active = false
            }
        }
    })
})
