// Express configuration + routes
require("dotenv").config();
const getWeather = require("./weather");
const getCountry = require("./country");
const getEvents = require("./events");

const express = require("express");
const app = express();


// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


// PUG SETUP
app.set("view engine", "pug");


// HOME ROUTE
app.get("/", (req, res) => {
    res.render("index");
});

// SEARCH ROUTE
app.post("/search", async(request, response) => {

    const city = request.body.city;
    const country = request.body.country;

    const weatherData = await getWeather(city); // Function call , go inside weather.js 
 console.log("WEATHER RESULT:");
console.log(weatherData);   
    const countryData = await getCountry(country); // Function call , go inside country.js 

    const eventsData = await getEvents(city); // Function call , go inside events.js 
    console.log(eventsData);
    
    // response.send(`Searching weather for ${city}, ${country}`); // message shown on browser
    // response.send(`
    //     <h1>${city}, ${country}</h1>
    //     <h3>weather data received</h3>
    //     <pre>
    //         ${JSON.stringify(weatherData, null, 2)}
    //     </pre>
    //     `);


    //REDIRECT TO Result.pug and show results
    response.render("result", {
        weather: weatherData,
        country: countryData,
        events: eventsData
    });
});

module.exports = app;