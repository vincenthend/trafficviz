function createBarChart(count) {
	d3.select('#barChart svg').remove();
	var chart = d3.select('#barChart').append('svg').attr('width', '100%').attr('height', '2rem');
	chart.append('rect').attr('width', "100%")
	.attr('x',0)
	.attr('y',0)
	.style("fill","#160701");

	// For each data
	var color = ["#F78F31", "#D2732B", "#B55C25", "#9A451F", "#813018", "#6B1C10"]
	if(count.length == getAccidentTypes().length){
		var sum = count.reduce((sum, num) => { return sum + num})
		var sumwidth = 0;
		var typeTranslate = ['Head-On Colission', 'Rear-End Collision', 'Side-Front Collision', 'Side-Side Collision', 'Pedestrian Accidents', 'Single Collision'];
		for(var i = 0; i < getAccidentTypes().length; i++){
			var rect = chart.append('rect');

			rect.attr('x', '0%')
			.attr('width', '0%')
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
				
				if(window.innerWidth < d3.event.pageX + tip.node().getBoundingClientRect().width){
					tip.style("left", (d3.event.pageX - 100)+"px")
					.style("top", (d3.event.pageY + 10)+"px")
				} else {
					tip.style("left", (d3.event.pageX)+"px")
					.style("top", (d3.event.pageY + 10)+"px")
				}
				tip.select("#tip-type-label").text(d.attr('data-text'));
				tip.select("#tip-type-number").text(d.attr('data-qty'));
			})
			.on('mousemove', function(){
				var tip = d3.select("#tip-type");
				if(window.innerWidth < d3.event.pageX + tip.node().getBoundingClientRect().width){
					tip.style("left", (d3.event.pageX - 100)+"px")
					.style("top", (d3.event.pageY + 10)+"px")
				} else {
					tip.style("left", (d3.event.pageX)+"px")
					.style("top", (d3.event.pageY + 10)+"px")
				}
			})
			.on('mouseout', function(){
				var d = d3.select(this);
				d.transition().duration(200).style('fill',d3.hsl(d.attr('default-fill')));

				var tip = d3.select("#tip-type");
				tip.transition().duration(200).style("opacity",0);
			});
			
			rect.transition().duration(250)
			.attr('x', sumwidth+'%')
			.attr('width', count[i]/sum*100+'%');
			sumwidth += count[i]/sum*100;
		}
	}
}

function getAccidentTypes() {
	return ['Tabrak Depan - Depan', 'Tabrak Depan - Belakang', 'Tabrak Depan - Samping', 'Tabrak Samping - Samping', 'Tabrak Manusia', 'Tabrak Tunggal']
}

function getCountPerType(startTime, location) {
	return getLocTimeAccidentData(startTime, location).then(function(locTimeData) {
		var count = [0, 0, 0, 0, 0, 0];
		var types = getAccidentTypes();

		for(i = 0; i < locTimeData.length; i++) {
			for(j = 0; j < types.length; j++) {
				if(locTimeData[i].type == types[j]) {
					count[j] += 1;
					break;
				}
			}
		}
		return count;
	});
}

function displayBarChart(startTime, location) {
	return getCountPerType(startTime, location).then(function(count) {
		createBarChart(count);
		return null;
	});
}