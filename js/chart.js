function createBarChart(count) {
	d3.select('#barChart svg').remove();
	var chart = d3.select('#barChart').append('svg').attr('width', '100%').attr('height', '2rem');
	
	chart.append('rect').attr('width', "100%")
	.attr('x',0)
	.attr('y',0)
	.style("fill","#000000");

	// For each data
	var color = ["#ED8A22", "#D57225", "#C15C26", "#B85226", "#AF4725"]
	if(count.length == getAccidentTypes().length){
		var sum = count.reduce((sum, num) => { return sum + num})
		var sumwidth = 0;
		var typeTranslate = ['Head-On Colission', 'Rear-End Collision', 'Side-Front Collision', 'Side-Side Collision', 'Pedestrian Accidents'];
		for(var i = 0; i < getAccidentTypes().length; i++){
			chart.append('rect')
			.attr('x', sumwidth+'%')
			.attr('width', count[i]/sum*100+'%')
			.attr('height', '2rem')
			.attr('id', 'chartAccident')
			.attr('data-text', typeTranslate[i])
			.attr('data-qty', count[i])
			.attr("default-fill",color[i])
			.style("fill",color[i])
			.on('mouseover', function(){
				var d = d3.select(this);
				d.transition().duration(200).style('fill',d3.hsl(d.attr('default-fill')).darker(0.8));

				var tip = d3.select("#tip-type");
				tip.transition().duration(200).style("opacity",0.9);
				tip.style("left", (d3.event.pageX)+"px")
					.style("top", (d3.event.pageY + 10)+"px")
				tip.select("#tip-type-label").text(d.attr('data-text'));
				tip.select("#tip-type-number").text(d.attr('data-qty'));
			})
			.on('mousemove', function(){
				var tip = d3.select("#tip-type");
				tip.style("left", (d3.event.pageX)+"px")
					.style("top", (d3.event.pageY + 10)+"px")
			})
			.on('mouseout', function(){
				var d = d3.select(this);
				d.transition().duration(200).style('fill',d3.hsl(d.attr('default-fill')));

				var tip = d3.select("#tip-type");
				tip.transition().duration(200).style("opacity",0);
			});
			;
			sumwidth += count[i]/sum*100;
		}
	}
}

function getAccidentTypes() {
	return ['Tabrak Depan - Depan', 'Tabrak Depan - Belakang', 'Tabrak Depan - Samping', 'Tabrak Samping - Samping', 'Tabrak Manusia']
}

function getCountPerType(accidentData, callback) {
	var count = [0, 0, 0, 0, 0];
	var types = getAccidentTypes();

	for(i = 0; i < accidentData.length; i++) {
		for(j = 0; j < types.length; j++) {
			if(accidentData[i].type == types[j]) {
				count[j] += 1;
				break;
			}
		}
	}

	callback(count);
}

function displayBarChart(startTime) {
	loadJson(function(response) {
			// Parse JSON string into object
		var jsonData = JSON.parse(response);

		getAccidentData(jsonData, startTime, function(dataAtCurrentTime) {
			
			getCountPerType(dataAtCurrentTime, function(count) {
				createBarChart(count);
			});

		});
	});
}