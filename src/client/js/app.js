const generate = document.getElementById("generate");
if (generate) {
    document.getElementById("generate").addEventListener("click", () => {
        event.preventDefault(); // prevent default button behavior
        const location = document.getElementById("location").value; // gathers user's input location
        const date = document.getElementById("date").value; // gathers user's input date
        let fxCall = checkDate(date); // checks input date to see if current temp or forecast temp should be used
        if (location && date) {
            // ensures user enters both a destination and a date
            const inputData = {
                location: location,
                future: fxCall,
            };
            const res = getData(inputData)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res); // log to help with T/S
                    document.getElementById("departDate").innerHTML = `Departure date: ${date}`; //takes all variables from server and places them on the webpage dynamically
                    document.getElementById("temp").innerHTML = "Temperature: " + res.temp + "°C";
                    document.getElementById("content").innerHTML = "Current Weather: " + res.weather;
                    document.getElementById("destination").src = res.image;
                    document.getElementById("language").innerHTML = "Language: " + res.language;
                    document.getElementById("currency").innerHTML = "Currency: " + res.currencies;
                    document.getElementById("country").innerHTML = "Country: " + res.name;
                    document.getElementById("region").innerHTML = "Region: " + res.region;
                });
        } else {
            alert("Please enter a valid destination and date!"); // error for not entering a date and a destination
        }
    });
}

const getData = async (data) => {
    // server call
    return await fetch("http://localhost:3030/apiData", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

const checkDate = (input) => {
    // checks input date, converts it to Unix time which is easier to compare the dates for me.  This part of the project took me a long time to figure out as comparing dates without creating a long loop seemed very difficult
    console.log(input);
    let inputDate = Math.round(new Date(input).getTime() / 1000);
    console.log(inputDate);
    let today = Math.round(new Date().getTime() / 1000);
    console.log(today);
    let week = Math.round(inputDate - today);
    if (week / 86400 <= 7) {
        // checks to see if the trip is less than a week away, then sends the appropriate string to the server for the API call
        console.log("within a week, send current weather");
        return "current?";
    } else {
        console.log("over a week, send forcast");
        return "forecast/daily?";
    }
};

module.exports = { generate, checkDate };
