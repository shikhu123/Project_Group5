const weather = {
	apiKey: "4e8f8df6a8188cf75777403b5405bbc1",
	fetchWeather: function (city) {
		fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&lang=fr&q=${city}&units=metric&appid=${this.apiKey}`

			)
			.then((response) => {
				if (!response.ok) {
					alert("No weather found.");
					throw new Error("No weather found.");
				}
				return response.json();
			})
			.then((data) => this.displayWeather(data));
	},
	displayWeather: function (data) {
		const {
			name
		} = data;
		const {
			icon,
			description
		} = data.weather[0];
		const {
			temp,
			humidity,
      pressure,
      feels_like
		} = data.main;
		const {
			speed
		} = data.wind;
    const {
      sunrise,
      sunset
    } = data.sys;
    const {
      lat,
      lon
    } = data.coord

	
		document.querySelector(".city").innerText = "Weather in " + name;
		document.querySelector(".icon").src =
			"https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".description").innerText = description;
		document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".lat").innerText =
			"Latitude: " + lat + " AM";
		document.querySelector(".lon").innerText =
			"Longitude: " + lon + " PM";  
		document.querySelector(".humidity").innerText =
			"Humidity: " + humidity + "%";
		document.querySelector(".wind").innerText =
			"Wind speed: " + speed + " km/h";
    document.querySelector(".pressure").innerText =
      "Pressure: " + pressure + " hpa";
    document.querySelector(".feels_like").innerText =
      "Feels Like: " + feels_like + " °C";  
    document.querySelector(".sunrise").innerText =
			"Sunrise: " + sunrise + " AM";
		document.querySelector(".sunset").innerText =
			"Sunset: " + sunset + " PM";    
	  

		document.querySelector(".weather").classList.remove("loading");
		document.body.style.backgroundImage =
			"url('https://source.unsplash.com/1600x900/?" + name + "')";
	},
	search: function () {
		this.fetchWeather(document.querySelector(".search-bar").value);
	},
};

document.querySelector(".search button").addEventListener("click", function () {
	weather.search();
});

document
	.querySelector(".search-bar")
	.addEventListener("keyup", function (event) {
		if (event.key == "Enter") {
			weather.search();
		}
	});

weather.fetchWeather("Scarborough");