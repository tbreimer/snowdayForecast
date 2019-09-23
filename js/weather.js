data = [];
dataDate = [];
forecast = [];

var lat;
var lon;

var weatherYesterday;
var weatherToday;
var weatherFuture;

function getYesterday(key, lat, lon){

  lat = lat;
  lon = lon;

  // Get yesterday's weather and append it

  var yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  yesterday = Math.floor(yesterday.getTime() / 1000);

  windGust = [];
  temperature = [];
  dewPoint = [];
  humidity = [];
  apparentTemperature = [];
  pressure = [];
  windSpeed = [];
  visibility = [];
  precipIntensity = [];
  precipProbability = [];

  console.log("Loaction: " + lat + ", " + lon);

  console.log("Retrieving Yesterday's Weather")

  var url = "https://api.darksky.net/forecast/" + key +"/" + lat + "," + lon + "," + yesterday;

    $.ajax({
        format: "jsonp",
        dataType: "jsonp",
        url: url,
        success: function(json) {

          weatherYesterday = json;

          for (var x = 14; x < 24; x ++){
            windGust.push(json.hourly.data[x].windGust);
          }

          for (var x = 14; x < 24; x ++){
            temperature.push(json.hourly.data[x].temperature);
          }
          for (var x = 14; x < 24; x ++){
            dewPoint.push(json.hourly.data[x].dewPoint);
          }

          for (var x = 14; x < 24; x ++){
            humidity.push(json.hourly.data[x].humidity);
          }

          for (var x = 14; x < 24; x ++){
            apparentTemperature.push(json.hourly.data[x].apparentTemperature);
          }

          for (var x = 14; x < 24; x ++){
            pressure.push(json.hourly.data[x].pressure);
          }

          for (var x = 14; x < 24; x ++){
            windSpeed.push(json.hourly.data[x].windSpeed);
          }

          for (var x = 14; x < 24; x ++){
            visibility.push(json.hourly.data[x].visibility);
          }

          for (var x = 14; x < 24; x ++){
            precipIntensity.push(json.hourly.data[x].precipIntensity);
          }

          for (var x = 14; x < 24; x ++){
            precipProbability.push(json.hourly.data[x].precipProbability);
          }


          console.log(json.hourly.data.length + " Hours Recieved")

          getToday(windGust, temperature, dewPoint, humidity, apparentTemperature, pressure, windSpeed, visibility, precipIntensity, precipProbability, key, lat, lon);
        }
    });
}

function getToday(windGust, temperature, dewPoint, humidity, apparentTemperature, pressure, windSpeed, visibility, precipIntensity, precipProbability, key, lat, lon){
  // Get today's weather, append it, and save it so it can be used for future
  
  var today = new Date();
  today = Math.floor(today.getTime() / 1000);

  console.log("Retrieving Today's Weather")

  var url = "https://api.darksky.net/forecast/" + key +"/" + lat + "," + lon + "," + today;

  $.ajax({
      format: "jsonp",
      dataType: "jsonp",
      url: url,
      success: function(json) {

        weatherToday = json;

          for (var x = 0; x < 15; x ++){
            windGust.push(json.hourly.data[x].windGust);
          }

          for (var x = 0; x < 15; x ++){
            temperature.push(json.hourly.data[x].temperature);
          }
          for (var x = 0; x < 15; x ++){
            dewPoint.push(json.hourly.data[x].dewPoint);
          }

          for (var x = 0; x < 15; x ++){
            humidity.push(json.hourly.data[x].humidity);
          }

          for (var x = 0; x < 15; x ++){
            apparentTemperature.push(json.hourly.data[x].apparentTemperature);
          }

          for (var x = 0; x < 15; x ++){
            pressure.push(json.hourly.data[x].pressure);
          }

          for (var x = 0; x < 15; x ++){
            windSpeed.push(json.hourly.data[x].windSpeed);
          }

          for (var x = 0; x < 15; x ++){
            visibility.push(json.hourly.data[x].visibility);
          }

          for (var x = 0; x < 15; x ++){
            precipIntensity.push(json.hourly.data[x].precipIntensity);
          }

          for (var x = 0; x < 15; x ++){
            precipProbability.push(json.hourly.data[x].precipProbability);
          }

          day0 = [];
        
          day0 = day0.concat(windGust);
          day0 = day0.concat(temperature);
          day0 = day0.concat(dewPoint);
          day0 = day0.concat(humidity);
          day0 = day0.concat(apparentTemperature);
          day0 = day0.concat(pressure);
          day0 = day0.concat(windSpeed);
          day0 = day0.concat(visibility);
          day0 = day0.concat(precipIntensity);
          day0 = day0.concat(precipProbability);

          day = new Date().getDate();

          month = new Date().getMonth() + 1;

          day0 = day0.concat(day);
          day0 = day0.concat(month);

          data.push(day0);
          dataDate.push(new Date(json.hourly.data[15].time * 1000));

          console.log(json.hourly.data.length + " Hours Recieved")

          getFuture(key, lat, lon);
      }
  });
}

function getFuture(key, lat, lon){

  console.log("Retrieving the 7-Day Forecast")
  
  var url = ("https://api.darksky.net/forecast/" + key + "/" + lat + "," + lon + "?extend=hourly");
  $.ajax({
      format: "jsonp",
      dataType: "jsonp",
      url: url,
      success: function(json) {

        

        weatherFuture = json;

        forecastData = json.hourly.data;
        todayData = weatherToday.hourly.data;

        var futureData = [];

        // Push today's weather data/forecast

        for (var x = 14; x < 24; x ++){
          futureData.push(todayData[x]);
        }

        // Find where the forecast data gets to the next day; where it will have to take over for todayData

        var startIndex = 0;

        for (var x = 0; x < 30; x ++){
          time = forecastData[x].time;
          var date = new Date(time * 1000);
          var hour = date.getHours();
          
          if (hour == "0"){
            startIndex = x;
            break;
          }
        }


        for (var x = startIndex; x < forecastData.length; x++){
          futureData.push(forecastData[x]);
        }

        // Now futureData is an array of data of hourly data from 2pm today to when the forecast ends

        var today = new Date();

        hour = today.getHours();

        // If it's past 11 or a weekend, delete the data for today and extend the forecast an extra day

        extraDay = false;

        if (hour > 10){
          data = [];
          dataDate = [];
          extraDay = true;
        }

        if (today.getDay() == 6 || today.getDay() == 0){
          data = [];
          dataDate = [];
          extraDay = true;
        }

        if (extraDay == true){
          end = 4;
        }else{
          end = 3;
        }

        // Put all the data into data[], skip weekends

        for (x = 0; x < end; x += 1){
          time = futureData[((25 * (x + 1)) - x)].time;

          var date = new Date(time * 1000);
          var day = date.getDay();

          
          if (day != 0 && day != 6){
            assembleData(futureData, (x * 25) - x, (25 * (x + 1)) - x);
          
          }else{
            end += 1
          }
        }

        console.log(json.hourly.data.length + " Hours Recieved")

        normalize();
      }
  })
}

function assembleData(rawArray, start, stop){

  windGust = [];
  temperature = [];
  dewPoint = [];
  humidity = [];
  apparentTemperature = [];
  pressure = [];
  windSpeed = [];
  visibility = [];
  precipIntensity = [];
  precipProbability = [];


  for (var x = start; x < stop; x ++){
    windGust.push(rawArray[x].windGust);
      time = rawArray[x].time;

      var date = new Date(time * 1000);
  }

  for (var x = start; x < stop; x ++){
    temperature.push(rawArray[x].temperature);
  }
  for (var x = start; x < stop; x ++){
    dewPoint.push(rawArray[x].dewPoint);
  }

  for (var x = start; x < stop; x ++){
    humidity.push(rawArray[x].humidity);
  }

  for (var x = start; x < stop; x ++){
    apparentTemperature.push(rawArray[x].apparentTemperature);
  }

  for (var x = start; x < stop; x ++){
    pressure.push(rawArray[x].pressure);
  }

  for (var x = start; x < stop; x ++){
    windSpeed.push(rawArray[x].windSpeed);
  }

  for (var x = start; x < stop; x ++){
    visibility.push(rawArray[x].visibility);
  }

  for (var x = start; x < stop; x ++){
    precipIntensity.push(rawArray[x].precipIntensity);
  }

  for (var x = start; x < stop; x ++){
    precipProbability.push(rawArray[x].precipProbability);
  }

  day0 = [];

  day0 = day0.concat(windGust);
  day0 = day0.concat(temperature);
  day0 = day0.concat(dewPoint);
  day0 = day0.concat(humidity);
  day0 = day0.concat(apparentTemperature);
  day0 = day0.concat(pressure);
  day0 = day0.concat(windSpeed);
  day0 = day0.concat(visibility);
  day0 = day0.concat(precipIntensity);
  day0 = day0.concat(precipProbability);

  time = rawArray[stop].time;

  var date = new Date(time * 1000);

  day = date.getDate();
  month = date.getMonth() + 1;

  day0 = day0.concat(day);
  day0 = day0.concat(month);

  data.push(day0);
  dataDate.push(date);

}

function normalize(){

  console.log("Normalizing Data")

  for (x = 0; x < data.length; x++){
    day = data[x];

    // windGust
    mn = 0
    mx = 40

    for (y = 0; y < 25; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // temperature
    mn = -30
    mx = 120

    for (y = 25; y < 50; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // dewPoint
    mn = -30
    mx = 120

    for (y = 50; y < 75; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }
    
    // humidity
    mn = 0
    mx = 1

    for (y = 75; y < 100; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // apparentTemperature
    mn = -30
    mx = 120

    for (y = 100; y < 125; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // pressure
    mn = 975
    mx = 1050

    for (y = 125; y < 150; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // windSpeed
    mn = 0
    mx = 20

    for (y = 150; y < 175; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // visibility
    mn = 0
    mx = 10

    for (y = 175; y < 200; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // precipIntensity
    mn = 0
    mx = 0.5

    for (y = 200; y < 225; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // precipProbability
    mn = 0
    mx = 1

    for (y = 25; y < 50; y++){
      day[y] = (day[y] - mn) / (mx - mn)

      if (day[y] > 1){
        day[y] = 1;
      }else if (day[y] < 0){
        day[y] = 0;
      }
    }

    // day
    mn = 1
    mx = 31

    day[250] = (day[250] - mn) / (mx - mn)

    if (day[250] > 1){
      day[250] = 1;
    }else if (day[250] < 0){
      day[250] = 0;
    }

    // day
    mn = 1
    mx = 12

    day[251] = (day[251] - mn) / (mx - mn)

    if (day[251] > 1){
      day[251] = 1;
    }else if (day[251] < 0){
      day[251] = 0;
    }

  }

  processModel();

}

function printData(){
  for (x = 0; x < data.length; x ++){
    string = "";

    for (y = 0; y < data[x].length; y++){
      string = string + data[x][y] + ",";

    }
    console.log(string)
  }
}