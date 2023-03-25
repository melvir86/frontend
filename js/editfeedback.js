$(document).ready(function() {

    //function to retrieve feedbacks on edit feedback page load
    var objid = (new URL(location.href)).searchParams.get('id');
    console.log(objid);

    fetch('http://localhost:8080/api/v1/feedbacks/' + objid + new URLSearchParams({
    }))
    .then(response => response.json())
    .then(data => {
    console.log("edit page");
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
    $.Toast("Failure!","Error in retrieving your feedback details", "error", options); 
    }
    else {
    document.getElementById(data[0].type).checked = true;
    document.getElementById('feedback_edit').value = data[0].feedback;
    document.getElementById('createdDate_edit').value = data[0].createdDate;
    document.getElementById('lastModifiedDate_edit').value = data[0].lastModifiedDate;
    document.getElementById('status_edit').value = data[0].status;
    $.Toast("Success!","You have retrieved your feedback detail", "success", options);  
    }
    //return response.json();
    });

        //function for update feedback handled by jquery
        $("#updateFeedback").click(function() {

                fetch("http://localhost:8080/api/v1/feedbacks/" + objid, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "user": "user1",
                    "type": document.querySelector('input[name="type"]:checked').value,
                    "feedback": document.getElementById('feedback_edit').value,
                    "status": document.getElementById('status_edit').value,
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
                $.Toast("Success!","You have updated your feeeback", "success", options);  
                }

                //return response.json();
                });
        });

                //function for delete feedback handled by jquery
                $("#deleteFeedback").click(function() {

                    fetch("http://localhost:8080/api/v1/feedbacks/" + objid, {
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
                    $.Toast("Success!","You have deleted your feeeback", "success", options);
                    setTimeout(
                        function() 
                        {
                            window.location.href = "feedback.html";  
                        }, 5000);
                    }
    
                    //return response.json();
                    });
            });

                 //function for cancel feedback handled by jquery
                $("#cancelFeedback").click(function() {
                    window.location.href = "feedback.html";  
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