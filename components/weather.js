// WeatherAPI fetch functions
async function getWeather(city) { // Gets receives city name & get weather data
    
    try{
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3`;

        const response = await fetch(url); //Sends request to Weather API

        if(!response.ok){
           const errorText = await response.text();
            throw new Error(errorText);
        }

        const data = await response.json(); // API return JSON data

        return {
            city: data.location.name,
            country: data.location.country,
            forecast: data.forecast.forecastday
        };
    }
    catch(err){
        console.log("Weather API Error:", err.message);
        return null;
    }

}
module.exports = getWeather;