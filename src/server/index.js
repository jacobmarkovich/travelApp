// Global variables
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
const geoKey = "&maxRows=10&username=" + process.env.GEONAMES_KEY;
const geoURL = "http://api.geonames.org/searchJSON?q=";
const wbKey = "&key=" + process.env.WEATHERBIT_KEY;
const wbURL = "https://api.weatherbit.io/v2.0/";
const pxKey = process.env.PIXABAY_KEY;
const pxURL = `https://pixabay.com/api/?key=${pxKey}&category=place&q=`;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

// Setup Server
const port = 3030;
// const server = app.listen(port, () => {
//     console.log(`running on localhost: ${port}`);
// });
function server(port) {
    app.listen(port, () => {
        console.log(`running on localhost: ${port}`);
    });
}
server(port);
app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});
//  Our API req tree
app.post("/apiData", async (req, res) => {
    inputLoc = req.body.location; // receiving inputs from the main page
    current = req.body.future;
    console.log("current? now set as: ", current); // logs to help with T/S
    console.log("inputLoc now set as: ", inputLoc);
    await fetch(`${geoURL}${inputLoc}${geoKey}`) // first API call which sends the location and recieves the lat/long/and country codes for other API calls
        .then((geoRES) => geoRES.json())
        .then((geo) => {
            console.log("Lat:", geo.geonames[0].lat, "long", geo.geonames[0].lng, "Code: ", geo.geonames[0].countryCode); // log to help with T/S
            const lat = geo.geonames[0].lat; // capturing the req data for future use
            const long = geo.geonames[0].lng;
            const code = geo.geonames[0].countryCode;
            fetch(`${wbURL}${current}&lat=${lat}&lon=${long}${wbKey}`) // Second API call to get weather info by sending lat/long from previous API
                .then((res) => res.json())
                .then((response) => {
                    console.log(response.data[0].temp); // logs to help with T/S
                    console.log(response.data[0].weather.description);
                    const weather = response.data[0].weather.description; // capturing weather details for webpage
                    const temp = response.data[0].temp;
                    fetch(`${pxURL}${inputLoc}`) // Third API call to send input data from main page to get a picture related to the location
                        .then((res) => res.json())
                        .then((response) => {
                            const resImage = response.hits[0].webformatURL; // capturing the image link
                            console.log(resImage); // log to help with T/S
                            fetch(`https://restcountries.eu/rest/v2/alpha/${code}`) // Fourth API call to get more info regarding the user's destination input.
                                .then((res) => res.json())
                                .then((response) => {
                                    console.log(response.languages[0].name); // log to help with T/S
                                    const name = response.name; // Capturing API data
                                    const region = response.region;
                                    const language = response.languages[0].name;
                                    const currencies = response.currencies[0].name;
                                    const apiPackage = { weather: weather, temp: temp, image: resImage, language: language, currencies: currencies, name: name, region: region }; // bundles all relevant API data to be sent back to main page
                                    console.log(apiPackage); // log to help with T/S
                                    res.send(apiPackage); // send API data back to main page
                                });
                        });
                });
        })
        .catch((error) => console.log("error", error));
});
module.exports = { app, server };
