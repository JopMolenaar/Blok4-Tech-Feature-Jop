window.onload = () => {
    const countryFilled = document.getElementById("countryFilled")
    const cityFilled = document.getElementById("cityFilled")
    const AtFilled = document.getElementById("AtFilled")
    // const ipAdress = document.getElementById("ipAdress")
    const jsOff = (document.getElementById("javascriptOffAtAdd").style.display = "none")
    const country = document.getElementById("country")
    const city = document.getElementById("city")
    const park = document.getElementById("park")

    const findip = () => {
        $.get("https://ipapi.co/" + "" + "/json", (data) => {
            // document.getElementById("out").innerHTML = "ip: " + data.ip + "<br>Location " + data.city + "," + data.region + "," + data.country_name

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

            const pPark = document.createElement("p")
            pPark.textContent = data.org
            AtFilled.appendChild(pPark)
        })
    }
}
