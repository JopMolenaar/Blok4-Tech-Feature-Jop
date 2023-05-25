const countryFilled = document.getElementById("countryFilled")
const cityFilled = document.getElementById("cityFilled")
const AtFilled = document.getElementById("AtFilled")
// const ipAdress = document.getElementById("ipAdress")
const jsOff = (document.getElementById("javascriptOffAtAdd").style.display = "none")
const country = document.getElementById("country")
const city = document.getElementById("city")
const park = document.getElementById("park")
const button = document.getElementById("findLocation")
let buttonClicked = false
const findip = () => {
    $.get("https://ipapi.co/" + "" + "/json", (data) => {
        // document.getElementById("out").innerHTML = "ip: " + data.ip + "<br>Location " + data.city + "," + data.region + "," + data.country_name

        if (buttonClicked === false) {
            buttonClicked = true

            country.value = data.country_name
            city.value = data.city
            park.value = data.org
            // ipAdress.value = data.ip

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

            //api
            const pCoordinates = document.getElementById("#coordinates")
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                // pCoordinates.value = `${latitude},${longitude}`
                console.log(`${latitude}, ${longitude}`)
            })

            const pPark = document.createElement("p")
            pPark.textContent = data.org
            AtFilled.appendChild(pPark)
            button.textContent = "Dont use my location"
        } else {
            button.textContent = "Use my location"
            buttonClicked = false
            country.value = ""
            city.value = ""
            park.value = ""

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
}
