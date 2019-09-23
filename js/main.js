// - Solve CORS issue. Exhaust research and experminetation before asking about it.
// - % When loading zips (? Preload zip file)
// - Error message if connection is lost while loading

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
var div;

function init(){

	menu = $('<div class="menuDiv">');
	menu.appendTo($("body"));

	// Logo1
	logo1 = $('<p id="logo1">Snowday</p>');
	logo1.click(function(){ location.reload() });
	logo1.appendTo(menu);

	// Logo2
	logo2 = $('<p id="logo2">Forecast</p>');
	logo2.click(function(){ location.reload() });
	logo2.appendTo(menu);

	// About Selector
	aboutSelector = $('<input class="selector" type="button" value="About"/>');
	aboutSelector.click(function(){ aboutScreen() });
	aboutSelector.appendTo(menu);

	div = $('<div class="bgDiv">');
	div.appendTo($("body"));

	if (mobile == false){
		locationScreenDesktop();
		//forecastScreenDesktop();
	}else{
		locationScreenMobile();
		//forecastScreenMobile();
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

function forecastScreen(){
	if (mobile == true){
		forecastScreenMobile();
	}else{
		forecastScreenDesktop();
	}
}

function forecastScreenDesktop(){
	mode = 1;

	setTimeout(refreshPrediction, 1800000);

	/*

	lat = 42.627836;
	lon = -73.717842;

	forecast = [[0.057240173, 0.17126693, 0.7711714, 0.0003214452],
	[0.998972793572605, 0.00045100410291864937, 0.00043948532463513386, 0.00013671699984105362],
	[0.13639331, 0.74445003, 0.10652736, 0.01262939],
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

	*/


	var header2 = $('<h1 id="forecastHeader">4-Day Forecast</h1>');
	header2.appendTo(div);

	// Back Button
	var backButton = $('<input type="button" id="backButton" value="Back"/>');
	backButton.appendTo(div);
	backButton.click(function(){location.reload()});

	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


	table = $('<table id="forecastTable">');
	table.appendTo(div);

	// Day 0
	day = dayNames[dataDate[0].getDay()];
	date = dataDate[0].getDate();
	month = monthNames[dataDate[0].getMonth()];

	line0 = $('<tr></tr>');
	line0.appendTo(table);

	line1 = $('<tr></tr>');
	line1.appendTo(table);

	line2 = $('<tr></tr>');
	line2.appendTo(table);

	line3 = $('<tr></tr>');
	line3.appendTo(table);

	infoColumn0 = $('<td class="infoColumn"></td>');
	infoColumn0.appendTo(line0);

	day0 = $('<h1 class="infoDay">' + day + '</h1>');
	day0.appendTo(infoColumn0);

	date0 = $('<h1 class="infoDate">' + date + ' ' + month + '</h1>');
	date0.appendTo(infoColumn0);

	textColumn0 = $('<td class="textColumn"></td>');
	textColumn0.appendTo(line1);

	percents0 = roundPercents(forecast[0]);

	addText(textColumn0, percents0);

	chartColumn0 = $('<td id="chartColumn0" class="chartColumn"></td>');
	chartColumn0.appendTo(line2);


	// Day 1
	day = dayNames[dataDate[1].getDay()];
	date = dataDate[1].getDate();
	month = monthNames[dataDate[1].getMonth()];

	infoColumn1 = $('<td class="infoColumn"></td>');
	infoColumn1.appendTo(line0);

	day1 = $('<h1 class="infoDay">' + day + '</h1>');
	day1.appendTo(infoColumn1);

	date1 = $('<h1 class="infoDate">' + date + ' ' + month + '</h1>');
	date1.appendTo(infoColumn1);

	textColumn1 = $('<td class="textColumn"></td>');
	textColumn1.appendTo(line1);

	percents1 = roundPercents(forecast[1]);

	addText(textColumn1, percents1);


	chartColumn1 = $('<td id="chartColumn1" class="chartColumn"></td>');
	chartColumn1.appendTo(line2);


	// Day 2

	day = dayNames[dataDate[2].getDay()];
	date = dataDate[2].getDate();
	month = monthNames[dataDate[2].getMonth()];

	infoColumn2 = $('<td class="infoColumn"></td>');
	infoColumn2.appendTo(line0);

	day2 = $('<h1 class="infoDay">' + day + '</h1>');
	day2.appendTo(infoColumn2);

	date2 = $('<h1 class="infoDate">' + date + ' ' + month + '</h1>');
	date2.appendTo(infoColumn2);

	textColumn2 = $('<td class="textColumn"></td>');
	textColumn2.appendTo(line1);

	percents2 = roundPercents(forecast[2]);

	addText(textColumn2, percents2);

	chartColumn2 = $('<td id="chartColumn2" class="chartColumn"></td>');
	chartColumn2.appendTo(line2);

	// Day 3
	day = dayNames[dataDate[3].getDay()];
	date = dataDate[3].getDate();
	month = monthNames[dataDate[3].getMonth()];

	infoColumn3 = $('<td class="infoColumn"></td>');
	infoColumn3.appendTo(line0);

	day3 = $('<h1 class="infoDay">' + day + '</h1>');
	day3.appendTo(infoColumn3);

	date3 = $('<h1 class="infoDate">' + date + ' ' + month + '</h1>');
	date3.appendTo(infoColumn3);

	textColumn3 = $('<td class="textColumn"></td>');
	textColumn3.appendTo(line1);

	percents3 = roundPercents(forecast[3]);

	addText(textColumn3, percents3);

	chartColumn3 = $('<td id="chartColumn3" class="chartColumn"></td>');
	chartColumn3.appendTo(line2);


	size = (window.innerWidth * 0.8) / 4;

	if (size > 180){
		size = 180;
	}

	canvas0 = $('<canvas id="chartCanvas0" class="chartCanvas">');
	canvas0.appendTo(chartColumn0);

	ctx0 = document.getElementById("chartCanvas0").getContext('2d');

	document.getElementById("chartCanvas0").width = size;
	document.getElementById("chartCanvas0").height = size;

	drawChart(ctx0, percents0, size, size);


	canvas1 = $('<canvas id="chartCanvas1" class="chartCanvas">');
	canvas1.appendTo(chartColumn1);

	ctx1 = document.getElementById("chartCanvas1").getContext('2d');

	document.getElementById("chartCanvas1").width = size;
	document.getElementById("chartCanvas1").height = size;

	drawChart(ctx1, percents1, size, size);


	canvas2 = $('<canvas id="chartCanvas2" class="chartCanvas">');
	canvas2.appendTo(chartColumn2);

	ctx2 = document.getElementById("chartCanvas2").getContext('2d');

	document.getElementById("chartCanvas2").width = size;
	document.getElementById("chartCanvas2").height = size;

	drawChart(ctx2, percents2, size, size);


	canvas3 = $('<canvas id="chartCanvas3" class="chartCanvas">');
	canvas3.appendTo(chartColumn3);

	ctx3 = document.getElementById("chartCanvas3").getContext('2d');

	document.getElementById("chartCanvas3").width = size;
	document.getElementById("chartCanvas3").height = size;

	drawChart(ctx3, percents3, size, size);

	if (window.innerHeight < 600){
		$("body").css("overflow", "visible");
		div.height(document.getElementById("forecastTable").offsetHeight + 100);
	}else{
		$("body").css("overflow", "hidden");
		div.height(window.innerHeight);
	}

}

window.addEventListener('resize', resize);

function resize(){

	if (mobile == false && mode == 1){

		size = (window.innerWidth * 0.8) / 4;

		if (size > 180){
			size = 180;
		}

		ctx0 = document.getElementById("chartCanvas0").getContext('2d');

		document.getElementById("chartCanvas0").width = size;
		document.getElementById("chartCanvas0").height = size;

		drawChart(ctx0, percents0, size, size);


		ctx1 = document.getElementById("chartCanvas1").getContext('2d');

		document.getElementById("chartCanvas1").width = size;
		document.getElementById("chartCanvas1").height = size;

		drawChart(ctx1, percents1, size, size);


		ctx2 = document.getElementById("chartCanvas2").getContext('2d');

		document.getElementById("chartCanvas2").width = size;
		document.getElementById("chartCanvas2").height = size;

		drawChart(ctx2, percents2, size, size);


		ctx3 = document.getElementById("chartCanvas3").getContext('2d');

		document.getElementById("chartCanvas3").width = size;
		document.getElementById("chartCanvas3").height = size;

		drawChart(ctx3, percents3, size, size);

		if (window.innerHeight < 600){
			$("body").css("overflow", "visible");
			div.height(document.getElementById("forecastTable").offsetHeight + 100);
		}else{
			$("body").css("overflow", "hidden");
			div.height(window.innerHeight);
		}
	}

	if (mobile == true && mode == 1){
		if (window.innerHeight < 1000){
			div.height(table.height() + 350);
		}else{
			div.height(window.innerHeight - ((9 / 100) * window.innerHeight));
			
		}
	}

	if (mobile == true && mode == 2){
		resizeAboutScreen();
	}
}


function forecastScreenMobile(){

	setTimeout(refreshPrediction, 1800000);

	mode = 1;

	/*

	lat = 42.627836;
	lon = -73.717842;

	forecast = [[0.057240173, 0.17126693, 0.7711714, 0.0003214452],
	[0.998972793572605, 0.00045100410291864937, 0.00043948532463513386, 0.00013671699984105362],
	[0.13639331, 0.74445003, 0.10652736, 0.01262939],
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

	*/

	var header2 = $('<h1 id="forecastHeader">4-Day Forecast</h1>');
	header2.appendTo(div);

	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


	table = $('<table class="forecastTable">');
	table.appendTo(div);

	// Day 0
	day = dayNames[dataDate[0].getDay()];
	date = dataDate[0].getDate();
	month = monthNames[dataDate[0].getMonth()];

	line0 = $('<tr></tr>');
	line0.appendTo(table);

	infoColumn0 = $('<td class="infoColumn"></td>');
	infoColumn0.appendTo(line0);

	day0 = $('<h1 class="infoDay">' + day + ',</h1>');
	day0.appendTo(infoColumn0);

	date0 = $('<h1 class="infoDate">' + date + ' ' + month + '</h1>');
	date0.appendTo(infoColumn0);

	textColumn0 = $('<td class="textColumn"></td>');
	textColumn0.appendTo(line0);

	percentColumn0 = $('<td class="percentColumn"></td>');
	percentColumn0.appendTo(line0);

	percents0 = roundPercents(forecast[0]);

	max = Math.max(parseInt(percents0[0]), parseInt(percents0[1]), parseInt(percents0[2]), parseInt(percents0[3]));

	regularDayPercent0 = $('<p class="regularDayPercent"><b>'+ percents0[0] +'%</b></p>');
	regularDayPercent0.appendTo(percentColumn0);

	regularDayText0 = $('<p class="regularDayText">Regular Day</p>');
	regularDayText0.appendTo(textColumn0);

	if (max == parseInt(percents0[0])){
		regularDayText0.css("font-weight", "bold");
	}

	snowdayPercent0 = $('<p class="snowdayPercent"><b>'+ percents0[1] +'%</b></p>');
	snowdayPercent0.appendTo(percentColumn0);

	snowdayText0 = $('<p class="snowdayText">Snowday</p>');
	snowdayText0.appendTo(textColumn0);

	if (max == parseInt(percents0[1])){
		snowdayText0.css("font-weight", "bold");
	}

	delayPercent0 = $('<p class="delayPercent"><b>'+ percents0[2] +'%</b></p>');
	delayPercent0.appendTo(percentColumn0);

	delayText0 = $('<p class="delayText">2-hr Delay</p>');
	delayText0.appendTo(textColumn0);

	if (max == parseInt(percents0[2])){
		delayText0.css("font-weight", "bold");
	}

	closingPercent0 = $('<p class="closingPercent"><b>'+ percents0[3] +'%</b></p>');
	closingPercent0.appendTo(percentColumn0);

	closingText0 = $('<p class="closingText">Early Closing</p>');
	closingText0.appendTo(textColumn0);

	if (max == parseInt(percents0[3])){
		closingText0.css("font-weight", "bold");
	}

	chartColumn0 = $('<td id="chartColumn0" class="chartColumn"></td>');
	chartColumn0.appendTo(line0);

	canvas0 = $('<canvas id="chartCanvas0" class="chartCanvas" width=20vw height=20vw>');
	canvas0.appendTo(chartColumn0);

	ctx0 = document.getElementById("chartCanvas0").getContext('2d');

	document.getElementById("chartCanvas0").width = chartColumn0.width();
	document.getElementById("chartCanvas0").height = chartColumn0.width();

	drawChart(ctx0, percents0, chartColumn0.width(), chartColumn0.width());

	// Day 1
	day = dayNames[dataDate[1].getDay()];
	date = dataDate[1].getDate();
	month = monthNames[dataDate[1].getMonth()];

	line1 = $('<tr></tr>');
	line1.appendTo(table);

	infoColumn1 = $('<td class="infoColumn"></td>');
	infoColumn1.appendTo(line1);

	day1 = $('<h1 class="infoDay">' + day + ',</h1>');
	day1.appendTo(infoColumn1);

	date1 = $('<h1 class="infoDate">' + date + ' ' + month + '</h1>');
	date1.appendTo(infoColumn1);

	textColumn1 = $('<td class="textColumn"></td>');
	textColumn1.appendTo(line1);

	percentColumn1 = $('<td class="percentColumn"></td>');
	percentColumn1.appendTo(line1);

	percents1 = roundPercents(forecast[1]);

	max = Math.max(parseInt(percents1[0]), parseInt(percents1[1]), parseInt(percents1[2]), parseInt(percents1[3]));

	regularDayPercent1 = $('<p class="regularDayPercent"><b>'+ percents1[0] +'%</b></p>');
	regularDayPercent1.appendTo(percentColumn1);

	regularDayText1 = $('<p class="regularDayText">Regular Day</p>');
	regularDayText1.appendTo(textColumn1);

	if (max == parseInt(percents1[0])){
		regularDayText1.css("font-weight", "bold");
	}

	snowdayPercent1 = $('<p class="snowdayPercent"><b>'+ percents1[1] +'%</b></p>');
	snowdayPercent1.appendTo(percentColumn1);

	snowdayText1 = $('<p class="snowdayText">Snowday</p>');
	snowdayText1.appendTo(textColumn1);

	if (max == parseInt(percents1[1])){
		snowdayText1.css("font-weight", "bold");
	}

	delayPercent1 = $('<p class="delayPercent"><b>'+ percents1[2] +'%</b></p>');
	delayPercent1.appendTo(percentColumn1);

	delayText1 = $('<p class="delayText">2-hr Delay</p>');
	delayText1.appendTo(textColumn1);

	if (max == parseInt(percents1[2])){
		delayText1.css("font-weight", "bold");
	}

	closingPercent1 = $('<p class="closingPercent"><b>'+ percents1[3] +'%</b></p>');
	closingPercent1.appendTo(percentColumn1);

	closingText1 = $('<p class="closingText">Early Closing</p>');
	closingText1.appendTo(textColumn1);

	if (max == parseInt(percents1[3])){
		closingText1.css("font-weight", "bold");
	}

	chartColumn1 = $('<td id="chartColumn1" class="chartColumn"></td>');
	chartColumn1.appendTo(line1);

	canvas1 = $('<canvas id="chartCanvas1" class="chartCanvas" width=21vw height=21vw>');
	canvas1.appendTo(chartColumn1);

	ctx1 = document.getElementById("chartCanvas1").getContext('2d');

	document.getElementById("chartCanvas1").width = chartColumn1.width();
	document.getElementById("chartCanvas1").height = chartColumn1.width();

	drawChart(ctx1, percents1, chartColumn1.width(), chartColumn1.width());

	// Day 2

	day = dayNames[dataDate[2].getDay()];
	date = dataDate[2].getDate();
	month = monthNames[dataDate[2].getMonth()];

	line2 = $('<tr></tr>');
	line2.appendTo(table);

	infoColumn2 = $('<td class="infoColumn"></td>');
	infoColumn2.appendTo(line2);

	day2 = $('<h1 class="infoDay">' + day + ',</h1>');
	day2.appendTo(infoColumn2);

	date2 = $('<h1 class="infoDate">' + date + ' ' + month + '</h1>');
	date2.appendTo(infoColumn2);

	textColumn2 = $('<td class="textColumn"></td>');
	textColumn2.appendTo(line2);

	percentColumn2 = $('<td class="percentColumn"></td>');
	percentColumn2.appendTo(line2);

	percents2 = roundPercents(forecast[2]);

	max = Math.max(parseInt(percents2[0]), parseInt(percents2[1]), parseInt(percents2[2]), parseInt(percents2[3]));

	regularDayPercent2 = $('<p class="regularDayPercent"><b>'+ percents2[0] +'%</b></p>');
	regularDayPercent2.appendTo(percentColumn2);

	regularDayText2 = $('<p class="regularDayText">Regular Day</p>');
	regularDayText2.appendTo(textColumn2);

	if (max == parseInt(percents2[0])){
		regularDayText2.css("font-weight", "bold");
	}

	snowdayPercent2 = $('<p class="snowdayPercent"><b>'+ percents2[1] +'%</b></p>');
	snowdayPercent2.appendTo(percentColumn2);

	snowdayText2 = $('<p class="snowdayText">Snowday</p>');
	snowdayText2.appendTo(textColumn2);

	if (max == parseInt(percents2[1])){
		snowdayText2.css("font-weight", "bold");
	}

	delayPercent2 = $('<p class="delayPercent"><b>'+ percents2[2] +'%</b></p>');
	delayPercent2.appendTo(percentColumn2);

	delayText2 = $('<p class="delayText">2-hr Delay</p>');
	delayText2.appendTo(textColumn2);

	if (max == parseInt(percents2[2])){
		delayText2.css("font-weight", "bold");
	}

	closingPercent2 = $('<p class="closingPercent"><b>'+ percents2[3] +'%</b></p>');
	closingPercent2.appendTo(percentColumn2);

	closingText2 = $('<p class="closingText">Early Closing</p>');
	closingText2.appendTo(textColumn2);

	if (max == parseInt(percents2[3])){
		closingText2.css("font-weight", "bold");
	}

	chartColumn2 = $('<td id="chartColumn2" class="chartColumn"></td>');
	chartColumn2.appendTo(line2);

	canvas2 = $('<canvas id="chartCanvas2" class="chartCanvas" width=22vw height=22vw>');
	canvas2.appendTo(chartColumn2);

	ctx2 = document.getElementById("chartCanvas2").getContext('2d');

	document.getElementById("chartCanvas2").width = chartColumn2.width();
	document.getElementById("chartCanvas2").height = chartColumn2.width();

	drawChart(ctx2, percents2, chartColumn2.width(), chartColumn2.width());

	// Day 3
	day = dayNames[dataDate[3].getDay()];
	date = dataDate[3].getDate();
	month = monthNames[dataDate[3].getMonth()];

	line3 = $('<tr></tr>');
	line3.appendTo(table);

	infoColumn3 = $('<td class="infoColumn" id="infoColumn3"></td>');
	infoColumn3.appendTo(line3);

	day3 = $('<h1 class="infoDay">' + day + ',</h1>');
	day3.appendTo(infoColumn3);

	date3 = $('<h1 class="infoDate">' + date + ' ' + month + '</h1>');
	date3.appendTo(infoColumn3);

	textColumn3 = $('<td class="textColumn" id="textColumn3"></td>');
	textColumn3.appendTo(line3);

	percentColumn3 = $('<td class="percentColumn" id="percentColumn3"></td>');
	percentColumn3.appendTo(line3);

	percents3 = roundPercents(forecast[3]);

	max = Math.max(parseInt(percents3[0]), parseInt(percents3[1]), parseInt(percents3[2]), parseInt(percents3[3]));

	regularDayPercent3 = $('<p class="regularDayPercent"><b>'+ percents3[0] +'%</b></p>');
	regularDayPercent3.appendTo(percentColumn3);

	regularDayText3 = $('<p class="regularDayText">Regular Day</p>');
	regularDayText3.appendTo(textColumn3);

	if (max == parseInt(percents3[0])){
		regularDayText3.css("font-weight", "bold");
	}

	snowdayPercent3 = $('<p class="snowdayPercent"><b>'+ percents3[1] +'%</b></p>');
	snowdayPercent3.appendTo(percentColumn3);

	snowdayText3 = $('<p class="snowdayText">Snowday</p>');
	snowdayText3.appendTo(textColumn3);

	if (max == parseInt(percents3[1])){
		snowdayText3.css("font-weight", "bold");
	}

	delayPercent3 = $('<p class="delayPercent"><b>'+ percents3[2] +'%</b></p>');
	delayPercent3.appendTo(percentColumn3);

	delayText3 = $('<p class="delayText">2-hr Delay</p>');
	delayText3.appendTo(textColumn3);

	if (max == parseInt(percents3[2])){
		delayText3.css("font-weight", "bold");
	}

	closingPercent3 = $('<p class="closingPercent"><b>'+ percents3[3] +'%</b></p>');
	closingPercent3.appendTo(percentColumn3);

	closingText3 = $('<p class="closingText">Early Closing</p>');
	closingText3.appendTo(textColumn3);

	if (max == parseInt(percents3[3])){
		closingText3.css("font-weight", "bold");
	}

	chartColumn3 = $('<td id="chartColumn3" class="chartColumn"></td>');
	chartColumn3.appendTo(line3);

	canvas3 = $('<canvas id="chartCanvas3" class="chartCanvas" width=23vw height=23vw>');
	canvas3.appendTo(chartColumn3);

	ctx3 = document.getElementById("chartCanvas3").getContext('2d');

	document.getElementById("chartCanvas3").width = chartColumn3.width();
	document.getElementById("chartCanvas3").height = chartColumn3.width();

	drawChart(ctx3, percents3, chartColumn3.width(), chartColumn3.width());

	if (window.innerHeight < 1000){
		div.height(table.height() + 350);
	}else{
		div.height(window.innerHeight - ((9 / 100) * window.innerHeight));
	}

	// Back Button
	var backButton = $('<input type="button" id="backButton" value="Back"/>');
	backButton.appendTo(div);
	backButton.click(function(){location.reload()});
}

window.addEventListener("orientationchange", function() {
	resize();
});

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

	keys = ["47ca1bf4b36a264350f6d25cf976072c", "3f993a6d04ea7fd3fd93535070c10719", "a833c61ad24bc80e61adce00352cd5e2", "b8e583ba3c2ee33992ac2cf2f2771376"];

	getYesterday(keys[Math.floor(Math.random() * keys.length)], coords[0], coords[1]);
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

function drawChart(ctx, forecast, width, height){

	ctx.lineWidth = width / 8;

	f0 = (forecast[0] * 6.3) / 100;

	ctx.strokeStyle = "#3399ff";

	ctx.beginPath();
	ctx.arc(Math.round(width / 2), Math.round(height / 2), Math.round(height / 2) - 35, 0 - 1.57500, f0 - 1.57500);
	ctx.stroke();

	f1 = (forecast[1] * 6.3) / 100;

	ctx.strokeStyle = "#6673d9";

	ctx.beginPath();
	ctx.arc(Math.round(width / 2), Math.round(height / 2), Math.round(height / 2) - 35, f0 - 1.57500, f0 + f1 - 1.57500);
	ctx.stroke();

	f2 = (forecast[2] * 6.3) / 100;

	ctx.strokeStyle = "#994db3";

	ctx.beginPath();
	ctx.arc(Math.round(width / 2), Math.round(height / 2), Math.round(height / 2) - 35, f0 + f1 - 1.57500, f0 + f1 + f2 - 1.57500);
	ctx.stroke();

	f3 = (forecast[3] * 6.3) / 100;

	ctx.strokeStyle = "#cc268c";

	ctx.beginPath();
	ctx.arc(Math.round(width / 2), Math.round(height / 2), Math.round(height / 2) - 35, f0 + f1 + f2 - 1.57500, f0 + f1 + f2 + f3 - 1.57500);
	ctx.stroke();
}

function removeByKey(arr, propertyName, propertyValue) {

  return arr.filter(item => item[propertyName] !== propertyValue);

}

// Scret Combo
var combo = [38, 38, 40, 40, 37, 39];

var keys = new Array(combo.length);
	$(document).on('keydown', function(evt){
	// remove the earliest of the stored keys
	keys.shift();
	// push in the latest key pressed
	keys.push(evt.which);

	// compare with combo array - you could use any comparison method (convert to string,...)
	if (!keys.some(function(e, i) { return e !== combo[i] }))
	  enterCoords();
})

function enterCoords(){
	lat = prompt("lat");
	lon = prompt("lon");
	startLoading();
	getWeather([lat, lon]);
}

function addText(element, percents){

	f0table = $('<table class="textTable">');
	f0table.appendTo(element);

	f0line0 = $('<tr></tr>');
	f0line0.appendTo(f0table);

	f0line1 = $('<tr></tr>');
	f0line1.appendTo(f0table);

	f0line2 = $('<tr></tr>');
	f0line2.appendTo(f0table);

	f0line3 = $('<tr></tr>');
	f0line3.appendTo(f0table);

	normalText0 = $('<td class="percentText">Regular Day</td>');
	normalText0.appendTo(f0line0);

	normalPercent0 = $('<td class="normalPercent">' + percents[0] + '%</td>');
	normalPercent0.appendTo(f0line0);

	snowdayText0 = $('<td class="percentText">Snowday</td>');
	snowdayText0.appendTo(f0line1);

	snowdayPercent0 = $('<td class="snowdayPercent">' + percents[1] + '%</td>');
	snowdayPercent0.appendTo(f0line1);

	delayText0 = $('<td class="percentText">2-hr Delay</td>');
	delayText0.appendTo(f0line2);

	delayPercent0 = $('<td class="delayPercent">' + percents[2] + '%</td>');
	delayPercent0.appendTo(f0line2);

	closingText0 = $('<td class="percentText">Early Closing</td>');
	closingText0.appendTo(f0line3);

	closingPercent0 = $('<td class="closingPercent">' + percents[3] + '%</td>');
	closingPercent0.appendTo(f0line3);

	max = Math.max(parseInt(percents[0]), parseInt(percents[1]), parseInt(percents[2]), parseInt(percents[3]));

	if (max == parseInt(percents[0])){
		normalText0.css("font-weight", "bold");
	}

	if (max == parseInt(percents[1])){
		snowdayText0.css("font-weight", "bold");
	}

	if (max == parseInt(percents[2])){
		delayText0.css("font-weight", "bold");
	}

	if (max == parseInt(percents[3])){
		closingText0.css("font-weight", "bold");
	}

}

function refreshPrediction(){
	location.reload();
}

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[images.length] = new Image();
        images[images.length].src = preload.arguments[images.length];
    }
}
