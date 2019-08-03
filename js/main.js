
var canvas0 = document.getElementById('layer0');
var ctx0 = canvas0.getContext("2d");
console.log("Canvas Created");

//Keys
document.body.addEventListener("keydown", keyDown, false);
document.body.addEventListener("keyup", keyUp, false);

var ui = new UI();
console.log("UI initialized");

window.addEventListener('resize', resize);

function resize(){
	windowWidth = window.innerWidth || document.body.clientWidth;
	windowHeight =  window.innerHeight || document.body.clientHeight;
	
	canvas0.width = windowWidth; //Change canvas size to window size
	canvas0.width = windowWidth;

	$("body").css("overflow", "hidden");
	
}


//Happens when page loads
function init(){
	resize();
	requestAnimationFrame(update);
	console.log("First Refresh");
}

function update(){
	requestAnimationFrame(update);
}

function UI(){
	this.mouseX;
	this.mouseY;
	this.mousePressed = false;
	this.click = false;
	UI.prototype.update = function(){
		this.click = false; //True for one frame after player releases mouse
	}
}

// Keys

function keyDown(evt){
  evt.preventDefault();
  set(evt.keyCode);
	evt.stopPropagation();
	return;
}

function keyUp(evt){
  evt.preventDefault();
  unSet(evt.keyCode);
	evt.stopPropagation();
	return;
}

function set(key){
}

function unSet(key){
}

// Mouse

function getMousePos(evt) {
	var rect = canvas0.getBoundingClientRect();

	ui.mouseX = evt.clientX - rect.left;
	ui.mouseY = evt.clientY - rect.top;

}


// Mouse clicked event listeners

function mouseDown(evt){
	ui.mousePressed = true;
}
function mouseUp(evt){
	ui.mousePressed = false;
	ui.click = true; // Will be true for one frame
}




