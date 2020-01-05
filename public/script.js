const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if(place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})

const city = document.querySelector('[data-location]')
const status = document.querySelector('[data-status]')
const temperature = document.querySelector('[data-temperature]')
const precipitation = document.querySelector('[data-precipitation]')
const wind = document.querySelector('[data-wind]')
const icon = new Skycons({ color: 'black'})
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place) {
    city.textContent = place
    status.textContent = data.summary
    temperature.textContent = data.temperature
    precipitation.textContent = `${data.precipProbability * 100}%`
    wind.textContent = data.windSpeed
    icon.set('icon', data.icon)
    icon.play()
}