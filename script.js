var iconObject = {
	Thunderstorm : "http://openweathermap.org/img/wn/11n@2x.png",
	Drizzle : "http://openweathermap.org/img/wn/09d@2x.png",
	Snow : "http://openweathermap.org/img/wn/13d@2x.png",
	Clear : "http://openweathermap.org/img/wn/01d@2x.png",
	Clouds : "http://openweathermap.org/img/wn/04d@2x.png",
	Mist : "http://openweathermap.org/img/wn/50d@2x.png",
	Smoke : "http://openweathermap.org/img/wn/50d@2x.png",
	Haze : "http://openweathermap.org/img/wn/50d@2x.png",
	Dust : "http://openweathermap.org/img/wn/50d@2x.png",
	Fog : "http://openweathermap.org/img/wn/50d@2x.png",
	Sand : "http://openweathermap.org/img/wn/50d@2x.png",
	Ash : "http://openweathermap.org/img/wn/50d@2x.png",
	Squall : "http://openweathermap.org/img/wn/50d@2x.png",
	Tornado : "http://openweathermap.org/img/wn/50d@2x.png"
};

var tempButton = document.querySelector("#tempbutton");

var isFahrenheit = false;

navigator.geolocation.getCurrentPosition(function(userPosition){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + Number(userPosition.coords.latitude) + '&lon=' + Number(userPosition.coords.longitude), true);
	request.onload = function() {
		var data = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {

			var currentWeather = data["weather"][0]["main"];
			var weather = document.querySelector("#weather");
			weather.textContent = currentWeather;

			var currentTemperature = Math.round(data["main"]["temp"]);
			var temperature = document.querySelector("#temperature");
			temperature.textContent = String(currentTemperature);


			var currentIcon = iconObject[currentWeather];
			var icon = document.querySelector("#icon");
			icon.innerHTML = "<img src=" + currentIcon + " >";

			tempButton.classList.add("btn","btn-md","btn-dark");
			tempButton.textContent = "Click to change temperature to Fahrenheit Scale";

			var scale = document.querySelector("#scale");
			scale.textContent = "°C";

			var temptext = document.querySelector("#temptext");
			temptext.textContent = "Temperature:";

			var currentHumidity = String(data.main.humidity);
			var humidity = document.querySelector("#humidity");
			humidity.textContent = currentHumidity+" %";
			var humidText = document.querySelector("#humidtext");
			humidText.textContent = "Humidity:";

			var currentPressure = String(data.main.pressure);
			var pressure = document.querySelector("#pressure");
			pressure.textContent = currentPressure + " hpa";
			var pressuretext = document.querySelector("#pressuretext");
			pressuretext.textContent = "Pressure:";

			var currentUserLocation = data.name +  " , " + data.sys.country;
			var userLocation = document.querySelector("#userlocation");
			userLocation.textContent = currentUserLocation;

			var currentWind = String(data.wind.speed);
			var wind = document.querySelector("#wind");
			wind.textContent = currentWind + " m/s";
			var windtext = document.querySelector("#windtext");
			windtext.textContent = "Wind:";
		} else { 
			console.log('error');
		}
	}
	request.send()
});

tempButton.addEventListener("click",function(){
	if(!isFahrenheit){
		this.textContent = "Click to change temperature to Celsius Scale";
		isFahrenheit = true;
		var temperature = document.querySelector("#temperature");
		var temp = Number(temperature.textContent);
		var fahtemp = String(Math.round((9/5)*temp + 32));
		var scale = document.querySelector("#scale");
		scale.textContent = "°F";
		temperature.textContent = fahtemp;
	}
	else{
		this.textContent = "Click to change temperature to Fahrenheit Scale";
		isFahrenheit = false;
		var temperature = document.querySelector("#temperature");
		var temp = Number(temperature.textContent);
		var celtemp = String(Math.round((5/9)*(temp - 32)));
		var scale = document.querySelector("#scale");
		scale.textContent = "°C";
		temperature.textContent = celtemp;
	}
});
