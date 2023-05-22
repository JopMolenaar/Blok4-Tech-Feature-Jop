// const filledIn = document.querySelector("#out")
// filledIn.style.display = "none"
const countryFilled = document.getElementById("countryFilled")
const cityFilled = document.getElementById("cityFilled")
const AtFilled = document.getElementById("AtFilled")
const input = document.getElementById("in")
countryFilled.style.display = "none"
cityFilled.style.display = "none"
AtFilled.style.display = "none"
input.style.display = "none"

const country = document.getElementById("country")
const city = document.getElementById("city")
const park = document.getElementById("park")

const findip = () => {
    $.get("https://ipapi.co/" + input.value + "/json", (data) => {
        // filledIn.style.display = "flex"
        // document.getElementById("out").innerHTML = "ip: " + data.ip + "<br>Location " + data.city + "," + data.region + "," + data.country_name

        country.value = data.country_name
        city.value = data.city
        park.value = data.org

        country.style.opacity = 0
        city.style.opacity = 0
        park.style.opacity = 0
        country.style.width = "1px"
        city.style.width = "1px"
        park.style.width = "1px"

        countryFilled.style.display = "flex"
        cityFilled.style.display = "flex"
        AtFilled.style.display = "flex"

        countryFilled.innerHTML = data.country_name
        cityFilled.innerHTML = data.city
        AtFilled.innerHTML = data.org
    })
}
