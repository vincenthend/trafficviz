function createBarChart(count, startTime, callback) {
	var ctx = document.getElementById('bar-chart').getContext('2d');

	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'bar',

	    // The data for our dataset
	    data: {
	        labels: getAccidentTypes(),
	        datasets: [{
	            label: 'My First dataset',
	            backgroundColor: 'rgb(255, 99, 132)',
	            borderColor: 'rgb(255, 99, 132)',
	            data: count
	        }]
	    },

	    // Configuration options go here
	    options: {}
	});

	callback();
}

function getAccidentTypes() {
	return ['Tabrak Depan - Depan', 'Tabrak Depan - Belakang', 'Tabrak Depan - Samping', 'Tabrak Samping - Samping', 'Tabrak Manusia']
}

function getCountPerType(accidentData, startTime, callback) {
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
			
			getCountPerType(dataAtCurrentTime, startTime, function(count) {
				console.log(startTime, dataAtCurrentTime, count);
				createBarChart(count, startTime, function() {

				});
			});

		});
	});
}