//OpenWeatherAPI for both weather and forecast
const WeatherApiKey = "34f12c2b799b9944ea3ffbbafb56d215";
const ForecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const WeatherApiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//Async function for OpenWeatherApi current weather API
async function checkWeather(city){
    const response = await fetch(WeatherApiUrl+city+ '&appid='+WeatherApiKey);
    var data = await response.json();
    // document.querySelector("#temp").innerHTML=Math.floor(data.main.temp);
    console.log(data);
    $("#temp").html(Math.floor(data.main.temp)+"&deg"+"<span>C</span>");
    $("#cityName").html(data.name);
    $("#feelsLike").html(Math.floor(data.main.feels_like)+"&deg");
    $("#pressure").html(data.main.pressure);
    $("#humidity").html(data.main.humidity);
    $("#visibility").html(Math.round(data.visibility)/1000);
    $("#speed").html(Math.round((data.wind.speed)*(18/5)));
    function deg(){
        if(data.wind.speed===0){
            return "No Wind";
        }
        else{
            return direction(data.wind.deg)}
    }
    $("#direction").html(deg());
    $("#weather").html(data.weather[0].main);
    var presentTime=data.dt;
    var sunRise=data.sys.sunrise;
    var sunSet=data.sys.sunset;
    if((presentTime>sunSet)||(presentTime<sunRise)){
        $("#sun").html(secondsToHm(data.sys.sunrise));
        $("#sunEvent").html("Sun Rise");
        $("#sunIcon").html('<i class="fa-solid fa-sun"></i>');
    }
    else if((presentTime>sunRise)&&(presentTime<sunSet)){
        $("#sun").html(secondsToHm(data.sys.sunset));
        $("#sunEvent").html("Sun Set");
        $("sunIcon").html('<i class="fa-solid fa-house-tsunami"></i>');
    }

    //Forecast Data
    $("#currenttemp").html(Math.floor(data.main.temp))
    function date(unixTime){
        var unixTimestamp = unixTime;
        var date = new Date(unixTimestamp * 1000);
        return date.toLocaleDateString("en-GB").slice(0,5);
        }
    $("#dateday2").html(date(data.dt+86400));
    $("#dateday3").html(date(data.dt+(2*86400)));
    $("#dateday4").html(date(data.dt+(3*86400)));
    $("#dateday5").html(date(data.dt+(4*86400)));
    $("#linedateday2").html(date(data.dt+86400));
    $("#linedateday3").html(date(data.dt+(2*86400)));
    $("#linedateday4").html(date(data.dt+(3*86400)));
    $("#linedateday5").html(date(data.dt+(4*86400)));
    if((data.weather[0].main==="Clear") && ((presentTime>sunSet)||(presentTime<sunRise))){
    $("#mainWeatherIcon").attr("class","fa-solid fa-moon fa-2xl material-symbols")   
    $("#currentWeatherIcon").attr("class","fa-solid fa-moon fa-2xl material-symbols")   
}
else if((data.weather[0].main==="Clear") && ((presentTime>sunRise)&&(presentTime<sunSet))){
    $("#mainWeatherIcon").attr("class","fa-solid fa-sun fa-2xl material-symbols")    
    $("#currentWeatherIcon").attr("class","fa-solid fa-sun fa-2xl material-symbols")   
    }
    $("#mainWeatherIcon").attr("class",weatherIcon(data.weather[0].main))    
    $("#currentWeatherIcon").attr("class",weatherIcon(data.weather[0].main))    
    function weatherIcon(data){
        if(data==='Clouds'){
            return "fa-sharp fa-solid fa-cloud fa-2xl material-symbols";
        }
        else if(data==="Haze" || data==="Smoke"){
            return "fa-solid fa-smog fa-2xl material-symbols";
        }
        else if(data==="Rain"){
            return "fa-solid fa-cloud-rain fa-2xl material-symbols";
        }
        else if(data="Mist"){
            return "fa-solid fa-water fa-2xl material symbols"
        }
        else if(data=="Cloudy-sun"){
            return "fa-solid fa-cloud-sun fa-xl material-symbols";
        }
        else if(data==="Clear"){
            return "fa-solid fa-cloud-sun fa-2xl material-symbols";
        }
    }

}
//Async function for OpenWeatherApi #hours/5days API
async function checkForecast(city){
    const response = await fetch(ForecastApiUrl+city+ '&appid='+WeatherApiKey);
    var data = await response.json();
    console.log(data);
    $("#currenttemp3").html(Math.floor(data.list[0].main.temp));
    $("#currenttemp6").html(Math.floor(data.list[1].main.temp));
    $("#currenttemp9").html(Math.floor(data.list[2].main.temp));
    $("#currenttemp12").html(Math.floor(data.list[3].main.temp));
    $("#currenttemp15").html(Math.floor(data.list[4].main.temp));
    $("#currenttemp18").html(Math.floor(data.list[5].main.temp));
    $("#currenttemp21").html(Math.floor(data.list[6].main.temp));
    $("#currenttime3").html(secondsToH(data.list[0].dt));
    $("#currenttime6").html(secondsToH(data.list[1].dt));
    $("#currenttime9").html(secondsToH(data.list[2].dt));
    $("#currenttime12").html(secondsToH(data.list[3].dt));
    $("#currenttime15").html(secondsToH(data.list[4].dt));
    $("#currenttime18").html(secondsToH(data.list[5].dt));
    $("#currenttime21").html(secondsToH(data.list[6].dt));
    function average(x,y){
        var sum=0;
        for(var i=x;i<=y;i++){
            sum+=data.list[i].main.temp
        }
        return Math.floor(sum/8);
    }
    $("#tempday2").html(average(8,15));
    $("#tempday3").html(average(16,23));
    $("#tempday4").html(average(24,31));
    $("#tempday5").html(average(32,39));
    $("#linetempday2").html(average(8,15));
    $("#linetempday3").html(average(16,23));
    $("#linetempday4").html(average(24,31));
    $("#linetempday5").html(average(32,39));
    $("#weatherday2").html(data.list[9].weather[0].main);
    $("#weatherday3").html(data.list[17].weather[0].main);
    $("#weatherday4").html(data.list[25].weather[0].main);
    $("#weatherday5").html(data.list[33].weather[0].main);
    $("#lineweatherday2").html(data.list[9].weather[0].main);
    $("#lineweatherday3").html(data.list[17].weather[0].main);
    $("#lineweatherday4").html(data.list[25].weather[0].main);
    $("#lineweatherday5").html(data.list[33].weather[0].main);
    $("#time3WeatherIcon").attr("class",weatherIcon(data.list[0].weather[0].main)) 
    $("#time6WeatherIcon").attr("class",weatherIcon(data.list[1].weather[0].main)) 
    $("#time9WeatherIcon").attr("class",weatherIcon(data.list[2].weather[0].main)) 
    $("#time12WeatherIcon").attr("class",weatherIcon(data.list[3].weather[0].main)) 
    $("#time15WeatherIcon").attr("class",weatherIcon(data.list[4].weather[0].main)) 
    $("#time18WeatherIcon").attr("class",weatherIcon(data.list[5].weather[0].main)) 
    $("#time21WeatherIcon").attr("class",weatherIcon(data.list[6].weather[0].main)) 
    $("#day2WeatherIcon").attr("class",weatherIcon(data.list[9].weather[0].main))
    $("#day3WeatherIcon").attr("class",weatherIcon(data.list[17].weather[0].main))
    $("#day4WeatherIcon").attr("class",weatherIcon(data.list[25].weather[0].main))
    $("#day5WeatherIcon").attr("class",weatherIcon(data.list[33].weather[0].main))
    $("#day2LineWeatherIcon").attr("class",weatherIcon(data.list[9].weather[0].main))
    $("#day3LineWeatherIcon").attr("class",weatherIcon(data.list[17].weather[0].main))
    $("#day4LineWeatherIcon").attr("class",weatherIcon(data.list[25].weather[0].main))
    $("#day5LineWeatherIcon").attr("class",weatherIcon(data.list[33].weather[0].main))
    function weatherIcon(data){
        if(data==='Clouds'){
            return "fa-sharp fa-solid fa-cloud fa-2xl material-symbols";
        }
        else if(data==="Clear"){
            return "fa-solid fa-cloud-sun fa-2xl material-symbols";
        }
        else if(data==="Haze" || data==="Smoke"){
            return "fa-solid fa-smog fa-2xl material-symbols";
        }
        else if(data==="Rain"){
            return "fa-solid fa-cloud-rain fa-2xl material-symbols";
        }
        else if(data="Mist"){
            return "fa-solid fa-water fa-2xl material symbols"
        }
        else if(data=="Cloudy-sun"){
            return "fa-solid fa-cloud-sun fa-xl material-symbols";
        }
    }
}

//Google maps places auto complete API
async function initialize(){

    var input = document.getElementById('inputText');
    let autocomplete = new google.maps.places.Autocomplete(input);

}
//Calling google API
initialize();

//For clicking the search button
$("#searchButton").click(function(){
    
    checkWeather(inputText.value);
    checkForecast(inputText.value);
    
})

//For the enter inpur from the keyboard
$("#inputText").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchButton").click();
    }
});

//Calling the OpenWeatherAPIs
checkWeather("Mumbai");
checkForecast("Mumbai");

//Function to unix to Hours : minnutes
function secondsToHm(unixTime){
    let unix_timestamp = unixTime;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    hours = checkTime(hours);
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
}

//Function to unix to Hours    
function secondsToH(unixTime){
    let unix_timestamp = unixTime;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    hours = checkTime(hours);
    var minutes = ":00";
    var formattedTime = hours + minutes;
    return formattedTime ;
}

//Function for the direction degree to direction in words    
function direction(deg){
    if(deg>0&&deg<11.25 || deg>348.75&&deg<360){
        return "N";
    }
    else if(deg>11.25&&deg<33.75){
        return "NNE"
    }
    else if(deg>33.75&&deg<56.25){
        return "NE"
    }
    else if(deg>56.25&&deg<78.75){
        return "ENE"
    }
    else if(deg>56.25&&deg<78.75){
        return "ENE"
    }
    else if(deg>78.75&&deg<101.25){
        return "E"
    }
    else if(deg>101.25&&deg<123.75){
        return "ESE"
    }
    else if(deg>123.75&&deg<146.25){
        return "SE"
    }
    else if(deg>146.25&&deg<168.75){
        return "SSE"
    }
    else if(deg>168.75&&deg<191.25){
        return "S"
    }
    else if(deg>191.25&&deg<213.75){
        return "SSW"
    }
    else if(deg>213.75&&deg<236.25){
        return "SW"
    }
    else if(deg>236.25&&deg<258.75){
        return "WSW"
    }
    else if(deg>258.75&&deg<281.25){
        return "W"
    }
    else if(deg>281.25&&deg<303.75){
        return "WNW"
    }
    else if(deg>303.75&&deg<326.25){
        return "NW"
    }
    else if(deg>326.25&&deg<348.75){
        return "NNW"
    }    
}

//Function for continuous time
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h= checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
}

//Function for today's date
function todayDate(){
    const date = new Date();

let day = date.getDate();
let monthNumber = date.getMonth() + 1;
let year = date.getFullYear();

//Function for monthnumber to Month name
function month(monthNumber){
if(monthNumber===1){
    return "Jan"
}
else if(monthNumber===2){
    return "Feb"
}
else if(monthNumber===3){
    return "Mar"
}
else if(monthNumber===4){
    return "Apr"
}
else if(monthNumber===5){
    return "May"
}
else if(monthNumber===6){
    return "Jun"
}
else if(monthNumber===7){
    return "Jul"
}
else if(monthNumber===8){
    return "Aug"
}
else if(monthNumber===9){
    return "Sept"
}
else if(monthNumber===10){
    return "Oct"
}
else if(monthNumber===11){
    return "Nov"
}
else if(monthNumber===12){
    return "Dec"
}
}
let currentDate = `${day} ${month(monthNumber)} ${year}`;
$("#date").html(currentDate);
}
//Calling today's date
todayDate();




