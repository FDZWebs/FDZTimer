//trackbeep1
var beep001 = document.getElementsByClassName("trackbeep1")[0];
var beep002 = document.getElementsByClassName("trackbeep2")[0];
beep001.muted = true;
beep002.muted = true;
var timercountdown;
var didTimerStart = false;

var displayTimer = document.getElementsByClassName("displayTimer")[0];
var cancelTimer = document.getElementsByClassName("cancelTimer")[0];	
var viewCountdown = document.getElementsByClassName("displaycountdown")[0];	

window.onload = initializer;

function initializer(){
	//vars

	//event listeners

	// functions
	clearOnFocus();
}

function printValue(){
beep001.play();
beep002.play();

if(!didTimerStart){/*
	console.log("timer set to: " + minsValue+":"+secsValue
				+"\n"+ "Set off a Beep every: " +beepMinsValue +":"+beepSecsValue
				+ "\nSeconds in total: "+(secondsInTotal));*/
	DisplayTimerEnabled();
	startCountDown();
	didTimerStart = true;
}else{
	console.log("There is already a timer running!");
}

}

function getWidth() {
return Math.max(
document.body.scrollWidth,
document.documentElement.scrollWidth,
document.body.offsetWidth,
document.documentElement.offsetWidth,
document.documentElement.clientWidth
);
}
function getHeight() {
return Math.max(
document.body.scrollHeight,
document.documentElement.scrollHeight,
document.body.offsetHeight,
document.documentElement.offsetHeight,
document.documentElement.clientHeight
);
}

var theHeight = getHeight();
var theScreen = getWidth();

function DisplayTimerEnabled(){
displayTimer.style.cssText="width: 100%; height: 100%";
cancelTimer.style.cssText="width: 40%; height: 40px; z-index: 2";
viewCountdown.style.cssText = " width: 60%; height: 40px";
if(theScreen <= 600){
	viewCountdown.style.cssText = " width: 90%; margin: 0 5%; height: 80px";
	console.log("The screen width: " + theScreen);
}
}
function DisplayTimerDisabled(){
displayTimer.style.cssText="width: 0; height: 0";
cancelTimer.style.cssText="width: 0; height:0";
viewCountdown.style.cssText = " width: 0; height: 0";
viewCountdown.innerHTML = "";
}
function startCountDown(){
nullBoxes();
var  setMins = document.getElementById("mins");
var  setSecs = document.getElementById("secs");
var  setBeepMins = document.getElementById("beepMins");
var  setBeepSecs = document.getElementById("beepSecs");

var minsValue = parseInt(setMins.value);
var secsValue = parseInt(setSecs.value);
var beepMinsValue = parseInt(setBeepMins.value);
var beepSecsValue = parseInt(setBeepSecs.value);

var secondsInTotal = ((minsValue * 60) + secsValue);
var timeBeforeBeep = ((beepMinsValue * 60) + beepSecsValue);
var totalBeepsRequested = secondsInTotal / timeBeforeBeep;

timercountdown = setInterval( function(){
	var remainingMins = Math.floor(secondsInTotal /60);	
	var remainingSecs = Math.floor(secondsInTotal % 60);

	//display the timer
	var realTimer = document.getElementsByClassName("displaycountdown")[0];
	realTimer.innerHTML= "The timer:  "+ remainingMins+":" + remainingSecs;	
	
	if(timeBeforeBeep <1 && !secondsInTotal < 1){
		beep001.muted = false;
		beep001.play();
		timeBeforeBeep = ((beepMinsValue * 60) + beepSecsValue);
		//console.log("beep1 beeped");
	}

	if(secondsInTotal  < 1){
		clearInterval(timercountdown);
		//console.log("Timer reached zero");
		didTimerStart = false;
		realTimer.innerHTML = "Timer reached zero";
		beep002.muted = false;
		beep002.play();
		//console.log("beep2 beeped");
	}
	secondsInTotal--;
	timeBeforeBeep--;
},1000);
}
function Endtimer(){
clearInterval(timercountdown);
didTimerStart = false;
//console.log("timer has been canceled");
DisplayTimerDisabled();
var realTimer = document.getElementsByClassName("displaycountdown")[0];
beep001.muted = true;
beep002.muted = true;
}
function nullBoxes(){
var textboxes = document.getElementsByClassName("numbox");
var boxCount = textboxes.length;
for( var i =0; i < boxCount; i++){
	if(textboxes[i].value <= 0){
		console.log("textboxes: "+i);
		textboxes[i].value = 0;
	}
}
}



function clearOnFocus(){
	var nb = document.getElementsByClassName('numbox');
	var nbCount = nb.length;
	for(var i =0; i<nbCount; i++){
			nb[i].addEventListener('focus',(e)=>{
			if(e){
				//e.target.select();
				//e.target.setSelectionRange(0, 9999);
				e.target.value = "";
			}		
		});
		
	}

}



