function update() {
	var startTime = document.getElementById("time-slider").value;
	startTime = parseInt(startTime);

	// Change bg color
	var body = document.body;
	body.style.backgroundColor = getBackgroundColor(startTime);

	// Show bar chart
	displayBarChart(startTime);

	// Rotate the clock
	var deg = startTime * 360 / 24;
	var clock = document.getElementById("time-clock");
	clock.style.transform = 'rotate('+deg+'deg)';

	// Create time label
	var finishTime = startTime + 1;

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
		backgroundGradient.setSpectrum('#283E51', '#4B79A1');
	} else {
		backgroundGradient.setNumberRange(12, 23);
		backgroundGradient.setSpectrum('#4B79A1', '#283E51');
	}
	return "#" + backgroundGradient.colourAt(startTime);
}