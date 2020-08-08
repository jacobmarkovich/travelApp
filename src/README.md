# TRAVEL APP!!!

## Overview
This project requires you to take two inputs from a user on the main page, date and destination.  Then once you have those inputs, first send the destination to an API to get it's latitude and longitude for the next apps.  As part of the extra assignment, I also gathered the country code for use of a fourth API that I will go over later.  Once the lat/long are recieved, send them to a second API which either gives you the current temp or the predicted forecast depending on the user's input date.  Then a third API call is made to get a picture from the user's destination.  Lastly I made a fourth API call to get more information regarding the country of the user's destination such as language and currency.  After getting all this information from all four APIs, dynamically update the main page with a picture and all the data that was captured. 

## Instructions
Using a terminal:
1.) type: 'npm install'
2.) type 'npm run build'
3.) type 'npm start'
4.) open a brower and in the navigation bar type: 'localhost:3030'

## Extras
Part of this project required selecting an extra to be added to the default page build.  I integrated the REST Countries API to get data specific to the destination's country and display it for the user so they can see the official language, currency, and region.

## APIs Used
Geonames: http://www.geonames.org/export/web-services.html
Weatherbit: https://www.weatherbit.io/account/create
Pixabay: https://pixabay.com/api/docs/
REST Countries: https://restcountries.eu/
