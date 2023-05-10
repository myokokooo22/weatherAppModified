let key = "af6f0a72fd0e5730b2ffa2a0687594dc";
let kelvin = 273;

let infos = document.querySelector('.infos');

let inputCity = document.getElementById('inputCity');
let temp = document.getElementById('temp');
let weatherStatus = document.getElementById('status');
let township = document.getElementById('township');
let country = document.getElementById('country');
let windSpeed = document.getElementById('windSpeed');
let icon = document.getElementById('icon');

let currentGps = document.querySelector(".currentGps");


    //By City Search
    inputCity.addEventListener('change',()=>{
        let city = inputCity.value;

        if(city){
            infos.classList.remove('hide');
        }
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

        fetch(api)
        .then(data => data.json())
        .then((result) => {
        currentGps.innerText = "";
        resultApi(result);
    })
    .catch(err => alert('Error to load')); 
    });

    //Location Detect
    function detectMyLocation(){
        navigator.geolocation.getCurrentPosition((position)=>{
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let detectApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

            fetch(detectApi)
            .then(data => data.json())
            .then((result)=>{
                currentGps.innerText = "Here's your current location weather condition.";
                resultApi(result);
            })
        });
    }

    //Api Function
    function resultApi(result){
        infos.classList.remove('hide');
        temp.innerText = Math.floor(result.main.temp) - kelvin + " °C";
        weatherStatus.innerText = result.weather[0].description;
        windSpeed.innerText =result.wind.speed;
        township.innerText = result.name;
        country.innerText = result.sys.country;
        let weatherIcon =  result.weather[0].icon;
        // console.log(weatherIcon)
        icon.innerHTML = `<img src = "./icons/${weatherIcon}.png"/>`;
    }
