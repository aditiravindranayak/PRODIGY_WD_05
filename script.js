document.getElementById('location-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('location-input').value.trim();
    
    if (location) {
        getWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

function getWeather(location) {
    const apiKey = 'db62fddc36374025827b174af076b84b'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Unable to fetch weather. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <div>Temperature: ${data.main.temp} °C</div>
        <div>Description: ${data.weather[0].description}</div>
        <div>Humidity: ${data.main.humidity}%</div>
        <div>Wind Speed: ${data.wind.speed} m/s</div>
    `;
}
