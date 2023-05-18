$(document).ready(function() {

    //function to retrieve feedbacks on edit feedback page load
    var objid = (new URL(location.href)).searchParams.get('id');
    console.log(objid);

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8084/api/v1/Appointments/' + objid + new URLSearchParams({
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
    $.Toast("Failure!","Error in retrieving your appointment details", "error", options); 
    }
    else {
        $('#appointment_gp').append($('<option></option>').val(data[0].gp).html(data[0].gp));
        
        //document.getElementById(data[0].type).checked = true;
        document.getElementById('appointment_type').value = data[0].appointment_type;
        document.getElementById('appointment_symptom').value = data[0].appointment_symptom;
        document.getElementById('appointment_cause').value = data[0].appointment_cause;
        document.getElementById('appointment_worry').value = data[0].appointment_worry;
        document.getElementById('appointment_duration').value = data[0].appointment_duration;
        document.getElementById('appointment_symptomstatus').value = data[0].appointment_symptomstatus;
        document.getElementById('appointment_improvement').value = data[0].appointment_improvement;
        document.getElementById('appointment_doctor').value = data[0].appointment_doctor;

        $("input[name=consent_contact]").val([data[0].consent_contact]);
        $("input[name=consent_sms]").val([data[0].consent_sms]);
        $("input[name=consent_email]").val([data[0].consent_email]);

        document.getElementById('gp_comments').value = data[0].gp_comments;

        $.Toast("Success!","You have retrieved your appointment request detail", "success", options);  
    }
    //return response.json();
});

            //function for update feedback handled by jquery
            $("#updateAppointment").click(function() {

                fetch("http://localhost:8084/api/v1/Appointments/" + objid, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "user": "user1",
                    "status": "Resubmitted",
                    "gp": document.getElementById('appointment_gp').value,
                    "appointment_type": document.getElementById('appointment_type').value,
                    "appointment_symptom": document.getElementById('appointment_symptom').value,
                    "appointment_cause": document.getElementById('appointment_cause').value,
                    "appointment_worry": document.getElementById('appointment_worry').value,
                    "appointment_duration": document.getElementById('appointment_duration').value,
                    "appointment_symptomstatus": document.getElementById('appointment_symptomstatus').value,
                    "appointment_improvement": document.getElementById('appointment_improvement').value,
                    "appointment_doctor": document.getElementById('appointment_doctor').value,

                    "consent_contact": document.querySelector('input[name="consent_contact"]:checked').value,
                    "consent_sms": document.querySelector('input[name="consent_sms"]:checked').value,
                    "consent_email": document.querySelector('input[name="consent_email"]:checked').value,

                    "gp_comments": document.getElementById('gp_comments').value
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
                $.Toast("Failure!","You have not updated your GP Appointment request", "error", options); 
                }
                else {
                $.Toast("Success!","You have updated your GP Appointment request", "success", options);
                setTimeout(function () {
                    window.location.href = "appointment.html"; //will redirect back to registergp page
                 }, 5000); //will call the function after 5 secs
                }

                //return response.json();
                });
        });

                //function for delete feedback handled by jquery
                $("#deleteAppointment").click(function() {

                    fetch("http://localhost:8084/api/v1/Appointments/" + objid, {
                    method: "delete",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
    
                    //make sure to serialize your JSON body
                    body: JSON.stringify({
                    })
                    })
                    .then( (response) => { 
                    //do something awesome that makes the world a better place
                    //console.log(response.json());
                    console.log(response.status); // Will show you the status
    
                    var options = {
                        position_class:"toast-top-right",
                        has_progress:true,
                    }
    
                    if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                    $.Toast("Failure!","You have not deleted your registration", "error", options); 
                    }
                    else {
                        $.Toast("Success!","You have deleted your GP Appointment request", "success", options);
                        setTimeout(function () {
                            window.location.href = "appointment.html"; //will redirect back to registergp page
                         }, 5000); //will call the function after 5 secs
                        }
    
                    //return response.json();
                    });
            });

                 //function for cancel feedback handled by jquery
                $("#cancel").click(function() {
                    window.location.href = "appointment.html";  
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