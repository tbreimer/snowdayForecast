// - Forecast Screen (%s Go From Red - Blue Based on amount, have little weather icon and amount of snow forecasted)
// - About Screen
// - Loading Bar
// - Favicon
// - Use random API Key
// - ZIP Code Progress Bar?
// - Solve CORS issue. Exhaust research and experminetation before asking about it.
// - Hide keywords in webpage
// - Switch to square borders to match forecast screen


// Powered by DarkSky (use extend=hourly for next 168 hours instead of just 48)

mobile = mobileCheck();
orientation = window.screen.orientation;


// Modes 0: Entering Zip Code 1: Forecast Screen
var mode = 0;

function mobileCheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (mobile == false){
	$('head').append('<link rel="stylesheet" type="text/css" href="css/desktop.css">');
}else{
	$('head').append('<link rel="stylesheet" type="text/css" href="css/mobile.css">');
	lockOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
	lockOrientation('portrait-primary');

}

// 0: Dissapearing
// 1: Fade in Loading Screen
// 2: Fade Out Loading Screen
// 3: Reappearing

loadingStage = 0;
bgOpacity = 1;

var menu;
var logo1;
var aboutSelector;
var div = "cool";

function init(){

	var menu = $('<div class="menuDiv">');
	menu.appendTo($("body"));

	// Logo1
	var logo1 = $('<p id="logo1">Snowday</p>');
	logo1.appendTo(menu);

	// Logo2
	var logo2 = $('<p id="logo2">Forecast</p>');
	logo2.appendTo(menu);

	// About Selector
	var aboutSelector = $('<input class="selector" type="button" value="About"/>');
	aboutSelector.appendTo(menu);

	div = $('<div class="bgDiv">');
	div.appendTo($("body"));

	if (mobile == false){
		//locationScreenDesktop();
		forecastScreenDesktop();
	}else{
		//locationScreenMobile();
		forecastScreenMobile();
	}


	
}

function locationScreenDesktop(){
	$("body").css("overflow", "hidden");

    // Header
    var header = $('<h1 id="enterZip">Please Enter Your Zip Code</h1>');
    header.appendTo(div);

    // Header 2
    var header2 = $('<p id="zipExplantion">(So we can get the weather from your location)</p>');
    header2.appendTo(div);

    var hDiv = $('<div class="hDiv">');
    hDiv.appendTo(div);

    // Form
    var form = $('<form>');
    form.append('<input type="number" placeholder="Ex. 12061" name="zip" id="zip"/>');
    form.submit(function(e) {
    	e.preventDefault();
    	getCoords($("#zip").val());
	});
    form.appendTo(hDiv);

    // Button
    var go = $('<input type="button" value="Go" id="goButton"/>');
    go.click(function(){getCoords($("#zip").val())});
    go.appendTo(hDiv);


}

function locationScreenMobile(){

    var hDiv = $('<div class="hDiv">');
    hDiv.appendTo(div);

    // Form
    var form = $('<form>');
    form.append('<input type="number" placeholder="ZIP Code" id="zip"/>');
    form.submit(function(e) {
    	e.preventDefault();
    	getCoords($("#zip").val());
	});
    form.appendTo(hDiv);

    // Button
    var go = $('<input type="button" value="Go" id="goButton"/>');
    go.click(function(){getCoords($("#zip").val())});
    go.appendTo(hDiv);

    if (navigator.geolocation) {
	    var header2 = $('<h1 id="or">OR</h1>');
	    header2.appendTo(div);

	    // Button
	    var gps = $('<input type="button" value="Use The GPS" id="gpsButton"/>');
	    gps.click(getCoords);
	    gps.appendTo(div);
	}
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {

	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();

	if (fill == true) {
		ctx.fill();
	}

	if (stroke == true) {
		ctx.stroke();
	}
}

function line(x1, y1, x2, y2, ctx){
	ctx.beginPath();
	ctx.moveTo(x1, y2);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function forecastScreenDesktop(){
	mode = 1;
	$("body").css("overflow", "hidden");

	canvas = $('<canvas id="canvas"></canvas>');
	canvas.appendTo(div);

	canvas = document.getElementById('canvas');

	ctx = canvas.getContext('2d');

	canvas.style.width = '100%';
  	canvas.style.height = '100%';
  	canvas.width = canvas.offsetWidth;
  	canvas.height = canvas.offsetHeight;

  	requestAnimationFrame(updateForecastScreenDesktop);
}

function updateForecastScreenDesktop(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	lat = 42.627836;
	lon = -73.717842;

	forecast = [[0.9997285901707017, 0.00011712429574139238, 0.0001225597221103038, 0.00003172581144667916],
	[0.998972793572605, 0.00045100410291864937, 0.00043948532463513386, 0.00013671699984105362],
	[0.9998441864885602, 0.00004878290925751962, 0.0000339973620209872, 0.0000730332401614256],
	[0.9982923568218304, 0.00036769061651476117, 0.0012979113749671096, 0.000042041186687930895]];

	day0 = new Date();
  	day0.setDate(day0.getDate() + 2);

  	day1 = new Date();
  	day1.setDate(day1.getDate() + 3);

  	day2 = new Date();
  	day2.setDate(day2.getDate() + 4);

  	day3 = new Date();
  	day3.setDate(day3.getDate() + 5);

	dataDate = [day0, day1, day2, day3];

	width = canvas.width / 2;
	height = canvas.height / 2;

	x = (canvas.width / 2) - (width / 2);
	y = (canvas.height / 2)- (height / 2);

	ctx.fillStyle = "black";
	ctx.fillRect(x, y, width, height);


	if (mode == 1){
		requestAnimationFrame(updateForecastScreenDesktop);
	}
}

function forecastScreenMobile(){
	mode = 1;

	canvas = $('<canvas id="canvas"></canvas>');
	canvas.appendTo(div);

	canvas = document.getElementById('canvas');

	ctx = canvas.getContext('2d');

	canvas.style.width = '100%';
  	canvas.style.height = '100%';
  	canvas.width = canvas.offsetWidth;
  	canvas.height = canvas.offsetHeight;

  	requestAnimationFrame(updateForecastScreenMobile);
}

function updateForecastScreenMobile(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	lat = 42.627836;
	lon = -73.717842;

	forecast = [[0.9997285901707017, 0.00011712429574139238, 0.0001225597221103038, 0.00003172581144667916],
	[0.998972793572605, 0.00045100410291864937, 0.00043948532463513386, 0.00013671699984105362],
	[0.9998441864885602, 0.00004878290925751962, 0.0000339973620209872, 0.0000730332401614256],
	[0.9982923568218304, 0.00036769061651476117, 0.0012979113749671096, 0.000042041186687930895]];

	day0 = new Date();
  	day0.setDate(day0.getDate() + 1);

  	day1 = new Date();
  	day1.setDate(day1.getDate() + 2);

  	day2 = new Date();
  	day2.setDate(day2.getDate() + 3);

  	day3 = new Date();
  	day3.setDate(day3.getDate() + 4);

	dataDate = [day0, day1, day2, day3];

	// Background

	bgWidth = canvas.width * 0.8;
	bgHeight = canvas.height * 0.6 ;

	bgX = (canvas.width / 2) - (bgWidth / 2);
	bgY = (canvas.height / 2) - (bgHeight / 2);

	ctx.fillStyle = "white";
	ctx.globalAlpha = 0.5;
	ctx.fillRect(bgX, bgY, bgWidth, bgHeight);
	ctx.globalAlpha = 1;

	ctx.strokeStyle = "#2c81d1";
	ctx.lineWidth = 4;

	line(bgX, bgY, bgX + bgWidth, bgY, ctx);
	line(bgX, bgY + Math.round(bgHeight / 4), bgX + bgWidth, bgY + Math.round(bgHeight / 4), ctx);
	line(bgX, bgY + Math.round(bgHeight / 2), bgX + bgWidth, bgY + Math.round(bgHeight / 2), ctx);
	line(bgX, bgY + Math.round(bgHeight * 0.75), bgX + bgWidth, bgY + Math.round(bgHeight * 0.75), ctx);
	line(bgX, bgY + Math.round(bgHeight), bgX + bgWidth, bgY + Math.round(bgHeight), ctx);

	// Header
	ctx.fillStyle = "black";
	ctx.font = "Bold 60px Times New Roman";
	text = "4 Day Forecast";
	ctx.fillText(text, Math.round(bgX), Math.round(bgY - 60));

	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "August", "September", "October", "November", "December"];

	// Day 0
	day = dayNames[dataDate[0].getDay()];
	date = dataDate[0].getDate();
	month = monthNames[dataDate[0].getMonth()];

	// Day
	text = day;
	dateX = bgX + 15;
	dateY = bgY + 45;

	ctx.fillStyle = "black";
	ctx.font = "Bold 40px Times New Roman";
	ctx.fillText(text, dateX, dateY);

	// Date
	text = date + " " + month;
	dayX = bgX + 15;
	dayY = dateY + 35;

	ctx.fillStyle = "black";
	ctx.font = "30px Times New Roman";
	ctx.fillText(text, dayX, dayY);

	if (mode == 1){
		requestAnimationFrame(updateForecastScreenMobile);
	}
}

function startLoading(){
	loadingStage = 0;
	requestAnimationFrame(loadingStage0);
}

function endLoading(){
	loadingStage = 2;
}

function loadingStage0(){
	div = $(".bgDiv");
	bgOpacity -= 0.05;
	div.children().css("opacity", bgOpacity.toString());

	if (bgOpacity <= 0){
		div.empty();

		if (loadingStage == 2){ // If it has already loaded, bypass the loading screen
			bgOpacity = 0;

			div.empty();

			forecastScreen();

			div.children().css("opacity", bgOpacity.toString());

			requestAnimationFrame(loadingStage3);
		}else{
			var loading = $("<h1>Loading</h1>")
			loading.css("margin-top", "40vh");
			loading.appendTo(div);

			div.children().css("opacity", bgOpacity.toString());

			requestAnimationFrame(loadingStage1);
		}
		
	}else{
		requestAnimationFrame(loadingStage0);
	}
	
}

function loadingStage1(){
	if (bgOpacity < 1){
		div = $(".bgDiv");
		bgOpacity += 0.05;
		div.children().css("opacity", bgOpacity.toString());
	}

	if (bgOpacity >= 1 && loadingStage == 2){
		requestAnimationFrame(loadingStage2);
	}else{
		requestAnimationFrame(loadingStage1);
	}
}

function loadingStage2(){
	
	div = $(".bgDiv");
	bgOpacity -= 0.05;
	div.children().css("opacity", bgOpacity.toString());

	if (bgOpacity <= 0){
		bgOpacity = 0;

		div.empty();

		forecastScreen();

		div.children().css("opacity", bgOpacity.toString());

		requestAnimationFrame(loadingStage3);
	}else{
		requestAnimationFrame(loadingStage2);
	}
}

function loadingStage3(){
	if (bgOpacity < 1){
		div = $(".bgDiv");
		bgOpacity += 0.05;
		div.children().css("opacity", bgOpacity.toString());

		requestAnimationFrame(loadingStage3);
	}
}

function getCoords(zip){
	document.body.style.cursor = "progress";

	if (typeof zip == "string"){
		$("#or").html("Checking ZIP Code..."); 
		$("#or").css("color", "#2c81d1"); 
		$("#zipExplantion").html("Checking ZIP Code..."); 
		$("#zipExplantion").css("color", "#2c81d1");

		zip = parseInt(zip);
		var locationPromise = getZIP(zip);
		locationPromise
      		.then(function(loc) { startLoading(); getWeather(loc); })
      		.catch(function(err) { $("#or").html("Enter a Valid 5-Digit US ZIP Code"); $("#or").css("color", "red"); $("#zipExplantion").html("Enter a Valid 5-Digit US ZIP Code"); $("#zipExplantion").css("color", "red"); document.body.style.cursor = "default"; });
	}else{
		var locationPromise = getGPS();
		locationPromise
      		.then(function(loc) { startLoading(); getWeather(loc); })
      		.catch(function(err) { $("#or").html("No GPS Found"); $("#or").css("color", "red");});
	}
}

function getWeather(coords) {
	lat = coords[0];
	lon = coords[1];

	getYesterday("47ca1bf4b36a264350f6d25cf976072c", coords[0], coords[1]);
}

function gotWeather() {
	document.body.style.cursor = "default";

	endLoading();
}

function getGPS(callback) {
    var promise = new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position){
                    resolve(([position.coords.latitude, position.coords.longitude]));
                },
                function(error){
                	if (error.code == error.PERMISSION_DENIED){
     					$("#or").html("Permission Was Denied"); $("#or").css("color", "red")
                	}
                });
        } else {
          reject("Unknown");
        }
    });

    return promise;
}



function getZIP(Azip){

	console.log("Retrieving Coordinates from ZIP Code");

	var promise = new Promise(function(resolve, reject) {

		array = null;

		d3.csv("https://forestquest.net/snowdayForecast/zip/zip.csv").then(function(data) {

			for (x = 0; x < data.length; x++){
				zip = data[x].ZIP;
				if (zip == Azip){
					lat = data[x].LAT;
					lon = data[x].LNG;
					array = [parseFloat(lat), parseFloat(lon)];

					resolve(array);
				}
			}

			if (array == null){
				reject("Unknown");
			}
		});

		

        
    });
    return promise;
}

function roundPercents(array){
	errorArray = [];
	roundedArray = [];
	flooredArray = [];

	for (x = 0; x < array.length; x++){


		percent = array[x] * 100;
		floored = Math.floor(percent);
		error = percent - floored;
		errorArray.push([error, floored, x]);

		//
		roundedArray.push(Math.round((array[x] * 100)));
		flooredArray.push(Math.floor((array[x] * 100)));
	}

	errorArray.sort(function(a, b) {
  		return b[0] - a[0];
	});

	for (x = 0; x < errorArray.length; x++){

		sum = 0;

		for (y = 0; y < errorArray.length; y++){
			sum += errorArray[y][1];
		}

		if (sum < 100){
			errorArray[x][1] = errorArray[x][1] + 1;
		}else{
			break;
		}
	}

	errorArray.sort(function(a, b) {
  		return a[2] - b[2];
	});

	finalArray = [];

	for (x = 0; x < errorArray.length; x++){
		finalArray.push(errorArray[x][1]);
	}

	return finalArray;
}

