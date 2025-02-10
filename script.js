let weatherForm = document.querySelector(`.weatherForm`);
const cityInput= document.querySelector(`.cityInput`);
const card= document.querySelectorAll(`.card`);
const apiKey= `03d27a1a8dad27781c4e755ad5fb9833`;

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();

    const city= cityInput.value;
    if(city){
       try{
          const weatherData= await getWeatherData(city);
          displayWeatherInfo(weatherData);
       }
       catch(error){
        console.error(error);
        displayError(error)
       }

    }
    else{
        displayError(`please enter a city!`);
    }


})
async function getWeatherData(city){
    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city }&appid${apiKey}`;
     const response= await fetch(apiUrl);
     console.log(response);
     if (!response.ok){
        throw new Error(`could not fetch weather data`)
     }
     return await response.json()
}
function displayWeatherInfo(data){
    const  {name:  city, 
        main:{temp, humidity}, 
        weather:[{description, id}]} = data;

        card.textContent= ``;
        card.style.display= `flex`;

    const cityDisplay= document.createElement(`h1`);
    const tempDisplay= document.createElement(`p`);
    const humidtyDisplay= document.createElement(`p`);
    const discDisplay= document.createElement(`p`);
    const WeatherEmogi= document.createElement(`p`);

    cityDisplay.textContent= city;
    tempDisplay.textContent= `${(temp- 273.15).toFixed(1)}°C`;
    humidtyDisplay.textContent= `Humidity: ${humidity}%`;
    discDisplay.textContent=   description;
    WeatherEmogi.textContent=  document.createElement(id)
    

    cityDisplay.classList.add(`cityDisplay`);
    tempDisplay.classList.add(`tempDisplay`);
    humidtyDisplay.classList.add(`humidtyDisplay`);
    discDisplay.classList.add(`descDisplay`);
    WeatherEmogi.classList.add(`weatherEmoji`)

    

    
    
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidtyDisplay);
    card.appendChild(discDisplay);
    card.appendChild(WeatherEmogi);
}
function getWeatherEmogi(weatherId){
    switch(true){
        case (weatherId>=200 && weatherId<300):
          return "🌧";
        case (weatherId>=300 && weatherId<400):
           return "🌨";
        case (weatherId>=500 && weatherId< 600):
            return "🌧";
        case (weatherId>=600 && weatherId<700):
            return "❄";
        case (weatherId>=700 && weatherId< 800):
            return " 🌫";
        case (weatherId=== 800):
            return " ☀";
        case (weatherId>=801 && weatherId< 810):
            return " ☁";
            default:
                return "❓";
    }
    

}
function displayError(message){
    const errorDisplay= document.createElement("p");
    errorDisplay.textContent=  message;

    card.textContent= ``;
    card.style.display = `block`;
    card.appendChild(errorDisplay);
    

}