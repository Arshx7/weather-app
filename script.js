let locality;
let currentUnit = "celsius";
getData(getClimate("India"))
const search  = document.querySelector(".button");
search.addEventListener("click", (event) => {
    event.preventDefault();
    locality = document.querySelector(".searchBar").value;
    if(locality.trim() != "") {

        let weatherData = getClimate(locality)
        getData(weatherData);
    }
    
})


//console.log(localitys);
async function getClimate(loc) {
    try {
        let climateData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=DH6AKZDHA7KMG6692SMCD6QWX`, {mode:"cors"})
    let result = await climateData.json();
    console.log(result);
    console.log(result.currentConditions)
    console.log(result.description)
    console.log(result.days[0].temp)
    console.log(result.currentConditions.temp)
    console.log(result.currentConditions)
    return result;
    } catch (error) {
        console.error(error);
    }
    
}



async function getData(weatherData) {

    let result = await weatherData; 
    if (!result || !result.currentConditions) {
        console.error("Weather data is not available.");
        return;
    }
    console.log(weatherData)
    const temperature = document.querySelector(".temp");
    const description = document.querySelector(".description");
    const humidity = document.querySelector(".humidity");
    const windSpeed = document.querySelector(".windSpeed");
    const sunrise = document.querySelector(".sunrise");
    const sunset = document.querySelector(".sunset");


    temperature.textContent = result.currentConditions.temp;
    description.textContent = result.description;
    humidity.textContent = "Humidity: " + result.currentConditions.humidity + "%";
    windSpeed.textContent = "Wind Speed: " + result.currentConditions.windspeed + " km/h";
    sunrise.textContent = "Sunrise:" + getHourAndMinute(result.currentConditions.sunrise);
    sunset.textContent = "Sunset: " + getHourAndMinute(result.currentConditions.sunset);

    const unitButtons = document.querySelectorAll(".unit");
    let newTemp;
    unitButtons.forEach((unitButton) => {
        unitButton.addEventListener("click", () => {
            
            if (unitButton.textContent === "Celsius") {
                newTemp = convertToCelsius(result.currentConditions.temp);
                temperature.textContent = newTemp.toFixed(1) + " °C";
            } else {
                
                newTemp = convertToFahrenheit(newTemp);
                temperature.textContent = newTemp.toFixed(1) + " °F";
            }
        });
    });
    
}

function getHourAndMinute(time) {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;  
}




function convertToCelsius(temperature) {
    return (temperature - 32) * 5/9;
}

function convertToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}