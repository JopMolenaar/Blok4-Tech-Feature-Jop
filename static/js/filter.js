window.onload = () => {
    const body = document.querySelector("body")
    const filterNav = document.querySelector("#locations section:nth-child(3)")

    const locationsList = document.querySelector("#locations ul")
    const selects = filterNav.querySelectorAll("select")
    const labels = filterNav.querySelectorAll("label")
    const jsOff = (document.getElementById("javascriptOff").style.display = "none")
    labels.forEach((label) => {
        label.style.display = "flex"
    })
    selects.forEach((select) => {
        select.addEventListener("change", () => {
            const others = locationsList.querySelectorAll(`li`)
            if (select.value != 0) {
                const answers = locationsList.querySelectorAll(`.${select.value}`)
                others.forEach((item) => {
                    item.style.display = "none"
                })
                answers.forEach((item) => {
                    item.style.display = "grid"
                })
            } else {
                others.forEach((item) => {
                    item.style.display = "grid"
                })
            }
        })
    })
    let optionValueArray = []
    const fixOptions = () => {
        const options = filterNav.querySelectorAll("option")
        options.forEach((option) => {
            if (optionValueArray.includes(`${option.value}`) || option.value === "") {
                option.style.display = "none"
            }
            optionValueArray.push(`${option.value}`)
        })
    }

    fixOptions()
    switch (body.id) {
        case "home":
        case "mainHandlebars":
            break
        default:
            console.error("this id is not supported")
            break
    }
}
