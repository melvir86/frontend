$(document).ready(function() {

  var boroughsdrilldown = [];
  var boroughsdrilldown = [];
  var boroughremainingdrilldown = [];

  var currentseries = [];
  var remainingseries = [];
 
  var boroughremainingcapacity = 0;

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8081/api/v1/GPs/' + new URLSearchParams({
    }))
    .then(response => response.json())
    .then(data => {
    console.log(data) // access json.body here
    //do something awesome that makes the world a better place
    //console.log(response.json());
    //console.log(JSON.stringify(response.json()));
    //console.log(response.status); // Will show you the status
    //console.log(json.body); // Will show you the status
    
    var options = {
        position_class:"toast-top-right",
        has_progress:true,
    }
    
    if (!data) {
    //throw new Error("HTTP status " + response.status);
    $.Toast("Failure!","Error in retrieving your GP capacity details", "error", options); 
    }
    else {

      $.each( data, function( key, val ) {
        //forms html variable by appending the result set data using key value pairs from the returned json

        var found = false;
        for(var i = 0; i < boroughsdrilldown.length; i++) {
            if (boroughsdrilldown[i].name == val.borough) {
                found = true;
                boroughsdrilldown[i].data.push({name: val.name, y: val.currentcapacity})
                break;
            }
        }

        if (found == false) {
          const obj = {
            name: val.borough,
            id: val.borough,
            data: [{name: val.name, y: val.currentcapacity}],
          }
          boroughsdrilldown.push(obj);
        }

          var foundremaining = false;
          for(var i = 0; i < boroughremainingdrilldown.length; i++) {
              if (boroughremainingdrilldown[i].name == val.borough) {
                  foundremaining = true;
                  boroughremainingcapacity = parseInt(val.maxcapacity) - parseInt(val.currentcapacity)
                  boroughremainingdrilldown[i].data.push({name: val.name, y: boroughremainingcapacity})
                  break;
              }
          }

          if (foundremaining == false) {
            boroughremainingcapacity = parseInt(val.maxcapacity) - parseInt(val.currentcapacity)
            const objremaining = {
              name: val.borough,
              id: val.borough,
              data: [{name: val.name, y: boroughremainingcapacity}]
            }
            boroughremainingdrilldown.push(objremaining);
          }

    });

    $.each( data, function( key, val ) {
      //forms html variable by appending the result set data using key value pairs from the returned json

      var remainingcapacity = 0;
      var remainingcapacitypercentage = 0;
      remainingcapacity = parseInt(val.maxcapacity) - parseInt(val.currentcapacity);

      remainingcapacitypercentage = (parseInt(remainingcapacity) / parseInt(val.maxcapacity)) * 100;

      const remainingcapabityobj = {name:val.name, borough:val.borough, y:remainingcapacitypercentage};
      remainingseries.push(remainingcapabityobj);
  });

  const chartOptions2 = Highcharts.chart('remainingcontainerpercentage', {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
        max: 100
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
  },
    series: [{
      name: 'Remaining Capacity in Percentage terms',
      data: remainingseries
  }]
});
    
    $.Toast("Success!","You have retrieved statistics for the dashboards", "success", options);  

    }

  });

      //function to retrieve feedbacks on main feedback page load
      fetch('http://localhost:8081/api/v1/GPs' + new URLSearchParams({
      }))
      .then(response => response.json())
      .then(data => {
      console.log(data) // access json.body here
      //do something awesome that makes the world a better place
      //console.log(response.json());
      //console.log(JSON.stringify(response.json()));
      //console.log(response.status); // Will show you the status
      //console.log(json.body); // Will show you the status
      
      var options = {
          position_class:"toast-top-right",
          has_progress:true,
      }
      
      if (!data) {
      //throw new Error("HTTP status " + response.status);
      $.Toast("Failure!","Error in retrieving your GP capacity details", "error", options); 
      }
      else {
  
        var boroughs = [];

        var boroughremaining = [];
        var boroughremainingcapacity = 0;

        $.each( data, function( key, val ) {
          //forms html variable by appending the result set data using key value pairs from the returned json
          var found = false;
          for(var i = 0; i < boroughs.length; i++) {
              if (boroughs[i].name == val.borough) {
                  found = true;
                  boroughcurrentcapacity = boroughs[i].y
                  boroughs[i].y = boroughs[i].y + val.currentcapacity
                  break;
              }
          }

          if (found == false) {
            const obj = {
              name: val.borough,
              y: val.currentcapacity,
              drilldown: val.borough
            }
            boroughs.push(obj);
          }

          var foundremaining = false;
          for(var i = 0; i < boroughremaining.length; i++) {
              if (boroughremaining[i].remainingborough == val.borough) {
                  foundremaining = true;
                  boroughremainingcapacity = boroughremaining[i].y
                  boroughremainingcapacity = parseInt(val.maxcapacity) - parseInt(val.currentcapacity)
                  boroughremaining[i].y = boroughremaining[i].y + boroughremainingcapacity
                  break;
              }
          }

          if (foundremaining == false) {
            boroughremainingcapacity = parseInt(val.maxcapacity) - parseInt(val.currentcapacity)
            const objremaining = {
              name: val.borough,
              remainingborough: val.borough,
              y: boroughremainingcapacity,
              drilldown: val.borough
            }
            boroughremaining.push(objremaining);
          }

      });

      /*
      console.log("up")
      console.log(boroughs)
      console.log("drilldown")
      console.log(boroughsdrilldown)
      console.log("up2")
      console.log(boroughremaining)
      console.log("drilldown2")
      console.log(boroughremainingdrilldown)
      */
  
      const chartOptions = Highcharts.chart('currentcontainer', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
      },
        series: [{
          name: 'Current GPs Load',
          data: boroughs
      }],
      drilldown: {
        breadcrumbs: {
            position: {
                align: 'right'
            }
        },
        series: boroughsdrilldown
    }
    });

    //chartOptions.drilldown.series = boroughsdrilldown;

    const chartOptions2 = Highcharts.chart('remainingcontainer', {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
          //max: 100
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
    },
      series: [{
        name: 'Remaining Capacity in Raw number terms',
        data: boroughremaining
    }],
    drilldown: {
      breadcrumbs: {
          position: {
              align: 'right'
          }
      },
      series: boroughremainingdrilldown
  }
  });
  
      }
    });

});