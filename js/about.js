var shownEmail = false;
var emailAdress;

var aboutHeight;

function aboutScreen(){

	aLoadingStage0();
}

function aLoadingStage0(){
	bgOpacity -= 0.05;
	div.children().css("opacity", bgOpacity.toString());

	if (bgOpacity <= 0){
		div.empty();

		bgOpacity = 0;
		div.children().css("opacity", bgOpacity.toString());

		if (mobile == true){
			aboutScreenMobile();
		}else{
			aboutScreenDesktop();
		}

		requestAnimationFrame(aLoadingStage1);
	}else{
		requestAnimationFrame(aLoadingStage0);
	}
}

function aLoadingStage1(){
	bgOpacity += 0.05;
	div.children().css("opacity", bgOpacity.toString());


	if (bgOpacity < 1){
		requestAnimationFrame(aLoadingStage1);
	}
}

function aboutScreenDesktop(){
	mode = 2;

	var header = $('<h1 id="about">About</h1>');
	header.appendTo(div);

	header.css("opacity", "0");

	var paragraph = $("<p class='aboutParagraph'>This web app was created by Thomas Breimer. Links to my social media can be found below. Thank you to the superintendent of EGCSD, Jeffrey Simons, for providing data which made this project possible.</p>")
	paragraph.appendTo(div);

	paragraph.css("opacity", "0");

	var paragraph2 = $("<p class='aboutParagraph'>Predictions are made with a model which incorporates machine learning. More details about the specific model can be found <a href='https://forestquest.net/?p=201'>here</a>. The model was trained on data from suburban, public, districts in the Capital Region of New York, so do not expect accuracy for other types of schools in different regions. Even still, weather forecasts can be wrong and the model will not be accurate 100% of the time. Please take the forecast as a suggestion, not as a definite answer. Thanks for using Snowday Forecast, and I wish you many snow days!</p>")
	paragraph2.appendTo(div);

	paragraph2.css("opacity", "0");

	var darkSky = $("<img id='darksky' src='icons/darksky.png'>");
	darkSky.appendTo(div);
	darkSky.click(function(){ window.location.href = "https://darksky.net/poweredby/"});


	aboutSelector.val("Back");
	aboutSelector.click(function(){ location.reload() });

	var mediaTable = $('<table id="mediaTable"></table>');
	mediaTable.appendTo(div);

	var row0 = $('<tr></tr>');
	row0.appendTo(mediaTable);

	var github = $('<td><img src="icons/github.png" width=60px height=50px></td>');
	github.click(function(){ window.location.href = "https://github.com/tbreimer" });
	github.appendTo(row0);

	var website = $('<td><img src="icons/website.png" width=50px height=50px></td>');
	website.click(function(){ window.location.href = "https://forestquest.net/" });
	website.appendTo(row0);

	var instagram = $('<td><img src="icons/instagram.png" width=50px height=50px></td>');
	instagram.click(function(){ window.location.href = "https://www.instagram.com/tbreimer/" });
	instagram.appendTo(row0);

	var email = $('<td><img src="icons/email.png" width=70px height=50px></td>');
	email.click(function(){ showEmail(email) })
	email.appendTo(row0);

}

function aboutScreenMobile(){
	mode = 2;

	div.children().css("opacity", "0");

	var header = $('<h1 id="about">About</h1>');
	header.appendTo(div);

	header.css("opacity", "0");

	var paragraph = $("<p class='aboutParagraph'>This web app was created by Thomas Breimer. Links to my social media can be found below. Thank you to the superintendent of EGCSD, Jeffrey Simons, for providing data which made this project possible.</p>")
	paragraph.appendTo(div);

	paragraph.css("opacity", "0");

	var paragraph2 = $("<p class='aboutParagraph'>Predictions are made with a model which incorporates machine learning. More details about the specific model can be found <a href='https://forestquest.net/?p=201'>here</a>. The model was trained on data from suburban, public, districts in the Capital Region of New York, so do not expect accuracy for other types of schools in different regions. Even still, weather forecasts can be wrong and the model will not be accurate 100% of the time. Please take the forecast as a suggestion, not as a definite answer. Thanks for using Snowday Forecast, and I wish you many snow days!</p>")
	paragraph2.appendTo(div);

	paragraph2.css("opacity", "0");

	var darkSky = $("<img id='darksky' src='icons/darksky.png'>");
	darkSky.appendTo(div);
	darkSky.click(function(){ window.location.href = "https://darksky.net/poweredby/"});

	

	// About Selector
	aboutSelector.remove();
	aboutSelector = undefined;

	aboutSelector = $('<input class="selector" type="button" value="Back"/>');
	aboutSelector.appendTo(menu);

	aboutSelector.val("Back");
	aboutSelector.click(function(){ location.reload() });

	var mediaTable = $('<table id="mediaTable"></table>');
	mediaTable.appendTo(div);

	var row0 = $('<tr></tr>');
	row0.appendTo(mediaTable);

	var github = $('<td><img src="icons/github.png" width=120px height=100px></td>');
	github.click(function(){ window.location.href = "https://github.com/tbreimer" });
	github.appendTo(row0);

	var website = $('<td><img src="icons/website.png" width=100px height=100px></td>');
	website.click(function(){ window.location.href = "https://forestquest.net/" });
	website.appendTo(row0);

	var row1 = $('<tr></tr>');
	row1.appendTo(mediaTable);

	var instagram = $('<td><img src="icons/instagram.png" width=100px height=100px></td>');
	instagram.click(function(){ window.location.href = "https://www.instagram.com/tbreimer/" });
	instagram.appendTo(row1);

	var email = $('<td><img src="icons/email.png" width=140px height=100px></td>');
	email.click(function(){ showEmail(email) })
	email.appendTo(row1);

	if (window.innerHeight < 1000){
		aboutHeight = mediaTable.height() + paragraph.height() + paragraph2.height() + darkSky.height() + header.height();
		div.height(aboutHeight + 100);
	}else{
		div.height(window.innerHeight - ((9 / 100) * window.innerHeight));
	}

	

}

function showEmail(td){
	if (shownEmail == false){
		emailAdress = $('<p id="emailAdress">tbreimer7@gmail.com<p>');
		emailAdress.appendTo(div);
		shownEmail = true;
	}else{
		shownEmail = false;
		emailAdress.remove();
	}
}

function resizeAboutScreen(){
	if (mobile == true){
		div.empty();
		aboutScreenMobile();
		div.children().css("opacity", "1");
	}
}