function changeTimeLabel() {
	var startTime = document.getElementById("time-slider").value;

	var body = document.body;
	body.style.backgroundColor = getBackgroundColor(startTime);

	var deg = parseInt(startTime) * 360 / 24;

	var clock = document.getElementById("time-clock");
	clock.style.transform = 'rotate('+deg+'deg)';

	var finishTime = parseInt(startTime) + 1;

	if(finishTime > 23) {
		finishTime = 0;
	}

	if(startTime < 10) {
		startTime = "0" + startTime;
	}

	if(finishTime < 10) {
		finishTime = "0" + finishTime;
	}

	document.getElementById("time-label").innerHTML = startTime + ":00-" + finishTime +":00";
}


function getBackgroundColor(startTime) {
	var backgroundGradient = new Rainbow();
	
	if(startTime <= 11) {
		backgroundGradient.setNumberRange(0, 11);
		backgroundGradient.setSpectrum('#2C3E50', '#FD746C');
	} else {
		backgroundGradient.setNumberRange(12, 23);
		backgroundGradient.setSpectrum('#FD746C', '#2C3E50');
	}
	return "#" + backgroundGradient.colourAt(startTime);
}