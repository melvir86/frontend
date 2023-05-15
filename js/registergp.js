$(document).ready(function() {

    //function to retrieve feedbacks on edit feedback page load
    //var objid = (new URL(location.href)).searchParams.get('id');
    //console.log(objid);

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8082/api/v1/Registrations/user?' + new URLSearchParams({
        "user": 'user1',
        "status": "Pending",
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
    $.Toast("Failure!","Error in retrieving your feedbacks", "error", options); 
    }
    else {
        var table = $('#registrationList').DataTable( {
            data: data,
            "columns": [
            { "data": "_id", "name": "Id", "title": "Id", "visible": false },
            { "data": "createdDate", "name": "Created Date", "title": "Created Date" },
            { "data": "lastModifiedDate", "name": "Last Modified Date", "title": "Last Modified Date" },
            { "data": "basic_forename", "name": "Forename", "title": "Forename" },
            { "data": "basic_surname", "name": "Surname", "title": "Surname" },
            { "data": "gp_borough", "name": "Borough", "title": "Borough" },
            { "data": "gp_primary", "name": "Primary GP", "title": "Primary GP" },
            { "data": "status", "name": "Status", "title": "Status" },
            { "data": "", "name": "", "title": "Action",
            render: function (data, type, row, meta) {
                if (row.status == "Submitted" || row.status == "Resubmitted" || row.status == "Information request by GP") {
                  $("#smarttab").empty();
                  $("#smarttab").append("You are not allowed to create another GP Registration request while your current request is being processed!");
                  return '<button>Edit</button>';
                }
                else {
                  return '<button disabled>Edit</button>';
                }
              }
            },
            ],
    } );

    $('#registrationList tbody').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        console.log(data);
        //alert("Parameter to pass to next page is: " + data._id);
        window.location.href = "editregistergp.html?id=" + data._id;
    });

    $.Toast("Success!","You have retrieved your feeebacks", "success", options);  
    }
    //return response.json();
});

            //function for update feedback handled by jquery
            $("#submitRegistration").click(function() {

                fetch("http://localhost:8082/api/v1/Registrations/", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "user": "user1",
                    "status": "Submitted",
                    "basic_forename": document.getElementById('basic_forename').value,
                    "basic_surname": document.getElementById('basic_surname').value,
                    "basic_dob": document.getElementById('basic_dob').value,
                    "basic_height": document.getElementById('basic_height').value,
                    "basic_weight": document.getElementById('basic_weight').value,
                    "basic_nhsnumber": document.getElementById('basic_nhsnumber').value,
                    "basic_country": document.getElementById('basic_country').value,
                    "basic_gender": document.getElementById('basic_gender').value,
                    "basic_address": document.getElementById('basic_address').value,
                    "basic_postcode": document.getElementById('basic_postcode').value,
                    "basic_email": document.getElementById('basic_email').value,

                    "health_suffered": document.getElementById('health_suffered').value,
                    "health_suffereddetails": document.getElementById('health_suffereddetails').value,
                    "health_operations": document.querySelector('input[name="health_operations"]:checked').value,
                    "health_TB": document.querySelector('input[name="health_TB"]:checked').value,
                    "health_TBCountry": document.querySelector('input[name="health_TBCountry"]:checked').value,
                    "health_smoke": document.querySelector('input[name="health_smoke"]:checked').value,
                    "health_drink": document.querySelector('input[name="health_drink"]:checked').value,
                    "health_disability": document.querySelector('input[name="health_disability"]:checked').value,
                    "health_disabilitydetails": document.getElementById('health_disabilitydetails').value,
                    "health_allergy": document.querySelector('input[name="health_allergy"]:checked').value,
                    "health_allergydetails": document.getElementById('health_allergydetails').value,
                    "health_medication": document.querySelector('input[name="health_medication"]:checked').value,
                    "health_medicationdetails": document.getElementById('health_medicationdetails').value,
                    "health_exercise": document.getElementById('health_exercise').value,

                    "family_illnesss": document.getElementById('family_illnesss').value,
                    "family_illnesssdetails": document.getElementById('family_illnesssdetails').value,
                    "family_carer": document.querySelector('input[name="family_carer"]:checked').value,
                    "family_carerdetails": document.getElementById('family_carerdetails').value,

                    "profiling_englishspoken": document.querySelector('input[name="profiling_englishspoken"]:checked').value,
                    "profiling_englishwritten": document.querySelector('input[name="profiling_englishwritten"]:checked').value,
                    "profiling_englishfirst": document.querySelector('input[name="profiling_englishfirst"]:checked').value,
                    "profiling_religion": document.getElementById('profiling_religion').value,
                    "profiling_ethnicgroup": document.getElementById('profiling_ethnicgroup').value,

                    "gp_borough": document.getElementById('gp_borough').value,
                    "gp_primary": document.getElementById('gp_primary').value,
                    "gp_secondary": document.getElementById('gp_secondary').value,

                    "consent_resident": document.querySelector('input[name="consent_resident"]:checked').value,
                    "consent_eea": document.querySelector('input[name="consent_eea"]:checked').value,
                    "consent_prc": document.querySelector('input[name="consent_prc"]:checked').value,
                    "consent_sms": document.querySelector('input[name="consent_sms"]:checked').value,
                    "consent_email": document.querySelector('input[name="consent_email"]:checked').value
                })
                })
                .then( (response) => { 
                //do something awesome that makes the world a better place
                console.log(response.json());
                console.log(response.status); // Will show you the status

                var options = {
                    position_class:"toast-top-right",
                    has_progress:true,
                }

                if (!response.ok) {
                throw new Error("HTTP status " + response.status);
                $.Toast("Failure!","You have not submitted your feeeback", "error", options); 
                }
                else {
                    $.Toast("Success!","You have updated your GP registration request", "success", options);
                    setTimeout(function () {
                        window.location.href = "registergp.html"; //will redirect back to registergp page
                     }, 5000); //will call the function after 5 secs
                }

                //return response.json();
                });
        });
        
    $("#gp_borough").change(function () {
    var borough = document.getElementById('gp_borough').value;
    console.log(borough);

    fetch('http://localhost:8081/api/v1/GPs/borough/' + borough + new URLSearchParams({
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
    $.Toast("Failure!","Error in retrieving your gp details", "error", options); 
    }
    else {

        $.each( data, function( key, val ) {
            //forms html variable by appending the result set data using key value pairs from the returned json
            $('#gp_primary').append($('<option></option>').val(val.name).html(val.name));
        });

    }
    //return response.json();
    });

    });

    $("#gp_primary").change(function () {

        var borough = document.getElementById('gp_borough').value;
        console.log(borough);
    
        fetch('http://localhost:8081/api/v1/GPs/borough/recommended/' + borough + '?' + new URLSearchParams({
            primaryGP: document.getElementById('gp_primary').value
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
        $.Toast("Failure!","Error in retrieving your gp details", "error", options); 
        }
        else {
    
            $.each( data, function( key, val ) {
                //forms html variable by appending the result set data using key value pairs from the returned json
                $('#gp_secondary').html("");
                $('#gp_secondary').append($('<option></option>').val(val.name).html(val.name));
            });
    
        }
        //return response.json();
        });
    
        });

        //function for cancel feedback handled by jquery
        $("#cancelRegistration").click(function() {
            window.location.href = "index.html";  
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