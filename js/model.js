
async function processModel(){

    console.log("Constructing Predictions")

    const inputData = tf.tensor2d([data[0], data[1], data[2], data[3]], [4, 252]);

    const model = await tf.loadLayersModel('https://forestquest.net/snowdayForecast/model/model.json');
    results = model.predict(inputData);

    const values = results.dataSync();
    const arr = Array.from(values);

    day0 = [];
    day1 = [];
    day2 = [];
    day3 = [];

    for (var x = 0; x < 4; x++){
      day0.push(arr[x]);
    }

    day0 = softmax(day0)
    forecast.push(day0)

    for (var x = 4; x < 8; x++){
      day1.push(arr[x]);
    }

    day1 = softmax(day1)
    forecast.push(day1)

    for (var x = 8; x < 12; x++){
      day2.push(arr[x]);
    }

    day2 = softmax(day2)
    forecast.push(day2)

    for (var x = 12; x < 16; x++){
      day3.push(arr[x]);
    }

    day3 = softmax(day3)
    forecast.push(day3)

    gotWeather();

    console.log(forecast);
    console.log(dataDate);

}

function softmax(arr) {
    return arr.map(function(value,index) { 
      return Math.exp(value) / arr.map( function(y /*value*/){ return Math.exp(y) } ).reduce( function(a,b){ return a+b })
    })
}
