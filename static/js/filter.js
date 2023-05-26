window.onload = () => {
    const body = document.querySelector("body")
    const filterNav = document.querySelector("#locations section:nth-child(3)")

    const locationsList = document.querySelector("#locations ul")
    const selects = filterNav.querySelectorAll("select")
    const labels = filterNav.querySelectorAll("label")
    const ckeckBox = filterNav.querySelectorAll("input[type=checkbox]")
    // needs to be a fix where you can see if a box is till checked
    console.log(ckeckBox)
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
    let isItEvenArray = []
    ckeckBox.forEach((box) => {
        box.addEventListener("change", () => {
            isItEvenArray.push(box.value)
            const filter = isItEvenArray.filter((word) => word === box.value)
            const others = locationsList.querySelectorAll(`li`)
            if (filter.length % 2 == 0) {
                others.forEach((item) => {
                    item.style.display = "grid"
                })
            } else {
                //odd
                const answers = locationsList.querySelectorAll(`.${box.value}`)
                others.forEach((item) => {
                    item.style.display = "none"
                })
                answers.forEach((item) => {
                    item.style.display = "grid"
                })
            }
        })
    })
    let optionValueArray = []
    const fixOptions = () => {
        const options = filterNav.querySelectorAll("option")
        options.forEach((option) => {
            if ((optionValueArray.includes(`${option.value}`) && option.value != 0) || option.value === "") {
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
