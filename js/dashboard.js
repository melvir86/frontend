$(document).ready(function() {

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
        currentseries.push(val.currentcapacity)
        currentcategories.push(val.name);
    });

    $.each( data, function( key, val ) {
      //forms html variable by appending the result set data using key value pairs from the returned json

      var remainingcapacity = 0;
      var remainingcapacitypercentage = 0;
      remainingcapacity = parseInt(val.maxcapacity) - parseInt(val.currentcapacity);

      remainingcapacitypercentage = (parseInt(remainingcapacity) / parseInt(val.maxcapacity)) * 100;

      remainingseries.push(remainingcapacitypercentage);
      remainingcategories.push(val.name);
  });

    const chartOptions = Highcharts.chart('currentcontainer', {
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

  const chartOptions2 = Highcharts.chart('remainingcontainer', {
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