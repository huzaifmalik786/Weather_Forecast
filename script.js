let weather={
    apiKey : "ce5e5d0ea2101a8c1998d66f7ec3595e",
    fetchweather : function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+
        "&units=metric&appid="+ this.apiKey)
        .then((response)=> {
            if(!response.ok){
                alert("no weather found. Please enter correct city name.");
                throw new Error("No weather found.");
            }
            return response.json();
        } 
       )
        .then((data) => this.displayweather(data))
    },
    displayweather: function(data){
        const {name} = data;
        const {description, icon} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".weather").classList.remove("loading")
        document.querySelector(".city").innerText = "Weather in "+ name;
        document.querySelector(".temp").innerText = temp+ "°C";
        document.querySelector(".hum").innerText = "Humidity: "+humidity+"%";
        document.querySelector(".ws").innerText= "Wind Speed: "+speed+ "Km/hr";
        document.querySelector(".desc").innerText= description;
        document.querySelector(".icon").src= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    },
    search: function(){
        this.fetchweather(document.querySelector(".input").value);
    }
}

document.querySelector(".search>button").addEventListener("click", function(){
    weather.search();
});
document.querySelector(".input").addEventListener("keyup", function(event){
    if (event.key=="Enter"){
        weather.search();
    }
});
weather.fetchweather("Delhi");

