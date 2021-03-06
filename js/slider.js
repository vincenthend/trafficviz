function update() {
	var startTime = document.getElementById("time-slider").value;

	// Set road color
	setRoadColor(parseInt(startTime));

	// Set text viz
	var currentLocation = d3.select("#current-location").node().value;
	showLocationData(currentLocation, parseInt(startTime));
		
	// Show bar chart
	// displayBarChart(parseInt(startTime), currentLocation);

	if(startTime >= 0){
		// Change bg color
		d3.select("body").transition().duration(150).styleTween("background-image",function(){
			var gradientLight;
			var gradientDark;
			if(startTime <= 11){
				gradientLight = d3.scaleLinear().domain([-1,11]).range(["#0D1B23", "#125066"]);
				gradientDark = d3.scaleLinear().domain([-1,11]).range(["#0D0F0F", "#0D1B23"]);
			} else {
				gradientLight = d3.scaleLinear().domain([12,23]).range(["#125066", "#0D1B23"]);
				gradientDark = d3.scaleLinear().domain([12,23]).range(["#0D1B23", "#0D0F0F"]);
			}
			return d3.interpolateString(d3.select(this).style("background-image"), "radial-gradient("+d3.rgb(gradientLight(startTime)).hex()+", "+d3.rgb(gradientDark(startTime)).hex()+")");
		});

		var deg = parseInt(startTime) * 360 / 24;
		
		// Rotate the clock
		d3.select("svg#DialImage #XMLID_308_")
			.transition().duration(150)
			.attrTween('transform', function(){
				return d3.interpolateString(d3.select(this).attr('transform'),'rotate('+deg+',-121.5,397)')
			});

		var finishTime = parseInt(startTime) + 1;

		// Setup time label
		if(finishTime > 23) {
			finishTime = 0;
		}
		if(startTime < 10) {
			startTime = "0" + startTime;
		}
		if(finishTime < 10) {
			finishTime = "0" + finishTime;
		}
		d3.select("#time-label").text(startTime + ":00-" + finishTime +":00");
	} else {
		// Reset to default position
		d3.select("svg#DialImage #XMLID_308_")
			.transition().duration(200)
			.attrTween('transform', function(){
				return d3.interpolateString(d3.select(this).attr('transform'),'rotate(0,-121.5,397)')
			});		
		animateDial();
		d3.select("#time-label").text("All Time");
	}
}

function animateDial(){
	d3.select("svg#DialImage #XMLID_308_")
		.transition().duration(5000)
		.attrTween('transform', function(){
			return d3.interpolateString('rotate(0,-121.5,397)','rotate(180,-121.5,397)')
		}).transition().duration(5000)
		.attrTween('transform', function(){
			return d3.interpolateString('rotate(180,-121.5,397)','rotate(360,-121.5,397)')
		})
		.on('end', animateDial);
}

function getBackgroundColor(startTime) {	
	if(startTime <= 11) {
		backgroundGradient.setNumberRange(0, 11);
		backgroundGradient.setSpectrum('#0D0F0F', '#5CB2CC');
	} else {
		backgroundGradient.setNumberRange(12, 23);
		backgroundGradient.setSpectrum('#5CB2CC', '#0D0F0F');
	}


	return ["#" + backgroundGradient.colourAt(startTime)];
}