$(document).ready(function() {

    var admin = "User1";

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8081/api/v1/GPs/' + admin + new URLSearchParams({
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
    document.getElementById('name').value = data[0].name;
    document.getElementById('maxcapacity').value = data[0].maxcapacity;
    document.getElementById('currentcapacity').value = data[0].currentcapacity;
    document.getElementById('remainingcapacity').value = data[0].maxcapacity - data[0].currentcapacity;
    document.getElementById('gpid').value = data[0]._id;
    
    //$.Toast("Success!","You have retrieved your gp detail", "success", options);  
    }
    //return response.json();
    });

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8082/api/v1/Registrations' + new URLSearchParams({
        //"status": "Pending",
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
    $.Toast("Failure!","Error in retrieving registration requests", "error", options); 
    }
    else {
        var table = $('#registrationList').DataTable( {
            data: data,
            "columns": [
            { "data": "_id", "name": "Id", "title": "Id", "visible": false },
            { "data": "basic_forename", "name": "Forename", "title": "Forename" },
            { "data": "basic_surname", "name": "Surname", "title": "Surname" },
            { "data": "createdDate", "name": "Created Date", "title": "Created Date" },
            { "data": "lastModifiedDate", "name": "Last Modified Date", "title": "Last Modified Date" },
            { "data": "gp_borough", "name": "Borough", "title": "Borough" },
            { "data": "gp_primary", "name": "Primary GP", "title": "Primary GP" },
            { "data": "status", "name": "Status", "title": "Status" },
            { "data": "", "name": "", "title": "Action",
            render: function (data, type, row, meta) {
                if (row.status == "Submitted" || row.status == "Resubmitted") {
                  return '<button>View Details to Approve/Reject</button>';
                }
                else {
                  return '<button disabled>View Details to Approve/Reject</button>';
                }
              }
            },
            ],
    } );

    $('#registrationList tbody').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        console.log(data);

        //alert("Parameter to pass to next page is: " + data._id);
        window.location.href = "approveregistrationrequests.html?id=" + data._id + "&gpid=" + document.getElementById('gpid').value + "&capacity=" + document.getElementById('currentcapacity').value;
    });

    $.Toast("Success!","You have retrieved all registration requests", "success", options);  
    }
    //return response.json();
});

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8084/api/v1/Appointments' + new URLSearchParams({
        //"status": "Pending",
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
    $.Toast("Failure!","Error in retrieving appointment requests", "error", options); 
    }
    else {
        var table = $('#appointmentList').DataTable( {
            data: data,
            "columns": [
            { "data": "_id", "name": "Id", "title": "Id", "visible": false },
            { "data": "user", "name": "Name", "title": "Name" },
            { "data": "createdDate", "name": "Created Date", "title": "Created Date" },
            { "data": "lastModifiedDate", "name": "Last Modified Date", "title": "Last Modified Date" },
            { "data": "appointment_type", "name": "Appointment Type", "title": "Appointment Type" },
            { "data": "appointment_symptom", "name": "Symptom", "title": "Symptom" },
            { "data": "appointment_doctor", "name": "Preferred Doctor", "title": "Preferred Doctor" },
            { "data": "status", "name": "Status", "title": "Status" },
            { "data": "appointment_datetime", "name": "Scheduled Slot", "title": "Scheduled Slot" },
            { "data": "", "name": "", "title": "Action",
            render: function (data, type, row, meta) {
                if (row.status == "Submitted" || row.status == "Resubmitted") {
                  return '<button>View Details to Accept/Reject</button>';
                }
                else {
                  return '<button disabled>View Details to Accept/Reject</button>';
                }
              }
            },
            ],
    } );

    $('#appointmentList tbody').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        console.log(data);
        //alert("Parameter to pass to next page is: " + data._id);
        window.location.href = "acceptappointmentrequests.html?id=" + data._id;
    });

    $.Toast("Success!","You have retrieved your appointments", "success", options);  
    }
    //return response.json();
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