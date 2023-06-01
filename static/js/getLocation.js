const countryFilled = document.getElementById("countryFilled")
const cityFilled = document.getElementById("cityFilled")
const AtFilled = document.getElementById("AtFilled")
const jsOff = (document.getElementById("javascriptOffAtAdd").style.display = "none")
const country = document.getElementById("country")
const city = document.getElementById("city")
const park = document.getElementById("park")
const ipButton = document.getElementById("findLocation")
const pCoordinates = document.getElementById("coordinates")
let buttonClicked = false
ipButton.addEventListener("click", () => {
    // Externe api for ip, automatic filled in form function
    $.get("https://ipapi.co/" + "" + "/json", (data) => {
        if (buttonClicked === false) {
            buttonClicked = true

            country.value = data.country_name
            city.value = data.city
            park.value = data.org

            country.style.opacity = 0
            city.style.opacity = 0
            park.style.opacity = 0
            country.style.width = "1px"
            city.style.width = "1px"
            park.style.width = "1px"

            const pCountry = document.createElement("p")
            pCountry.textContent = data.country_name
            countryFilled.appendChild(pCountry)

            const pCity = document.createElement("p")
            pCity.textContent = data.city
            cityFilled.appendChild(pCity)

            // Geolocation web api, gets the coordinates form your location
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                pCoordinates.value = `${latitude},${longitude}`
                console.log(pCoordinates.value)
            })

            const pPark = document.createElement("p")
            pPark.textContent = data.org
            AtFilled.appendChild(pPark)
            ipButton.textContent = "Dont use my location"
        } else {
            ipButton.textContent = "Use my location"
            buttonClicked = false
            country.value = ""
            city.value = ""
            park.value = ""
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                console.log(`Dont use ${latitude},${longitude}`)
                pCoordinates.value = null
            })
            country.style.opacity = "100%"
            city.style.opacity = "100%"
            park.style.opacity = "100%"
            country.style.width = "35%"
            city.style.width = "35%"
            park.style.width = "35%"

            const labels = document.querySelectorAll("form label p")
            labels.forEach((label) => {
                label.remove()
            })
        }
    })
})
