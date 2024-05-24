// Generate random data for the chart
function generateData() {
  var data = [];
  for (var i = 0; i < 10; i++) {
    data.push(Math.floor(Math.random() * 100));
  }
  return data;
}

// Create the chart
var ctx = document.getElementById('dynamic-chart').getContext('2d');
var dynamicChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
      label: 'Dynamic Chart',
      data: generateData(),
      borderColor: 'green',
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white'
        }
      }]
    }
  }
});

// Update the chart data every 2 seconds
setInterval(function() {
  dynamicChart.data.datasets[0].data = generateData();
  dynamicChart.update();
}, 2000);
