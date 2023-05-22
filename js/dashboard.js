$(document).ready(function() {

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
        var boroughscategories = [];
        var boroughcurrentcapacity = 0;

        var boroughremaining = [];
        var boroughremainingcapacity = 0;

        $.each( data, function( key, val ) {
          //forms html variable by appending the result set data using key value pairs from the returned json
          var found = false;
          for(var i = 0; i < boroughs.length; i++) {
              if (boroughs[i].borough == val.borough) {
                  found = true;
                  boroughcurrentcapacity = boroughs[i].y
                  boroughs[i].y = boroughs[i].y + val.currentcapacity
                  break;
              }
          }

          if (found == false) {
            const obj = {
              borough: val.borough,
              y: val.currentcapacity,
              drilldown: val.borough
            }
            boroughs.push(obj);
            boroughscategories.push(val.borough);
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
              remainingborough: val.borough,
              y: boroughremainingcapacity,
              drilldown: val.borough
            }
            boroughremaining.push(objremaining);
          }

      });

    console.log(boroughremaining);
  
      const chartOptions = Highcharts.chart('currentcontainer', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: boroughscategories
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
      }]
    });

    const chartOptions2 = Highcharts.chart('remainingcontainer', {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
          categories: boroughscategories
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
    }]
  });
  
      }

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

      var currentseries = [];
      var currentcategories = [];

      var remainingseries = [];
      var remainingcategories = [];

      $.each( data, function( key, val ) {
        //forms html variable by appending the result set data using key value pairs from the returned json
        const currentcapabityobj = {name:val.name, borough:val.borough, y:val.currentcapacity};
        currentseries.push(currentcapabityobj);
        currentcategories.push(val.name);

        /*
        data: [
                {
                    name: 'Chrome',
                    y: 63.06,
                    drilldown: 'Chrome'
                }
        */
    });

    $.each( data, function( key, val ) {
      //forms html variable by appending the result set data using key value pairs from the returned json

      var remainingcapacity = 0;
      var remainingcapacitypercentage = 0;
      remainingcapacity = parseInt(val.maxcapacity) - parseInt(val.currentcapacity);

      remainingcapacitypercentage = (parseInt(remainingcapacity) / parseInt(val.maxcapacity)) * 100;

      const remainingcapabityobj = {name:val.name, borough:val.borough, y:remainingcapacitypercentage};
      remainingseries.push(remainingcapabityobj);
      remainingcategories.push(val.name);
  });

    const chartOptions = Highcharts.chart('currentcontainerbackup', {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
          categories: currentcategories
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
        name: 'Current Capacity',
        data: currentseries
    }]
  });

  const chartOptions2 = Highcharts.chart('remainingcontainerbackup', {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: remainingcategories
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
    });

$(".sidemenu").fly_sidemenu();

$('#smarttab').smartTab({
selected: 0, // Initial selected tab, 0 = first tab
theme: 'elite', // theme, related css need to include for other than default theme
justified: true, // Nav menu justification. true/false
autoAdjustHeight: true, // Automatically adjust content height
backButtonSupport: true, // Enable the back button support
enableUrlHash: true, // Enable selection of the step based on url hash
transition: {
animation: 'slideSwing', // Animation effect on navigation, none|fade|slideHorizontal|slideVertical|slideSwing|css(Animation CSS class also need to specify)
speed: '400', // Animation speed. Not used if animation is 'css'
easing: '', // Animation easing. Not supported without a jQuery easing plugin. Not used if animation is 'css'
prefixCss: '', // Only used if animation is 'css'. Animation CSS prefix
fwdShowCss: '', // Only used if animation is 'css'. Step show Animation CSS on forward direction
fwdHideCss: '', // Only used if animation is 'css'. Step hide Animation CSS on forward direction
bckShowCss: '', // Only used if animation is 'css'. Step show Animation CSS on backward direction
bckHideCss: '', // Only used if animation is 'css'. Step hide Animation CSS on backward direction
},
autoProgress: { // Auto navigate tabs on interval
enabled: false, // Enable/Disable Auto navigation
interval: 3500, // Auto navigate Interval (used only if "autoProgress" is enabled)
stopOnFocus: true, // Stop auto navigation on focus and resume on outfocus
},
keyboard: {
keyNavigation: true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
keyLeft: [37, 38], // Left key code
keyRight: [39, 40], // Right key code
keyHome: [36], // Home key code
keyEnd: [35] // End key code
},
style: { // CSS Class settings
mainCss: 'st',
navCss: 'nav',
navLinkCss: 'nav-link',
contentCss: 'tab-content',
contentPanelCss: 'tab-pane',
themePrefixCss: 'st-theme-',
justifiedCss: 'st-justified',
anchorDefaultCss: 'default',
anchorActiveCss: 'active',
loaderCss: 'st-loading'
},
getContent: null
});

});