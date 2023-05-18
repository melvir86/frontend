            $(document).ready(function() {

            //function to retrieve feedbacks on main feedback page load
            fetch('http://localhost:8083/api/v1/feedbacks/user?' + new URLSearchParams({
                "user": 'user1',
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
                var table = $('#feedbackList').DataTable( {
                    data: data,
                    "columns": [
                    { "data": "_id", "name": "Id", "title": "Id", "visible": false },
                    { "data": "createdDate", "name": "Created Date", "title": "Created Date" },
                    { "data": "lastModifiedDate", "name": "Last Modified Date", "title": "Last Modified Date" },
                    { "data": "type", "name": "Type", "title": "Type" },
                    { "data": "feedback", "name": "Feedback", "title": "Feedback" },
                    { "data": "user", "name": "Created By", "title": "Created By" },
                    { "data": "status", "name": "Status", "title": "Status",
                    render: function (data, type, row, meta) {
                        if (row.status == "Pending") {
                          return '<button>Edit</button>';
                        }
                        else {
                          return '<button disabled>Edit</button>';
                        }
                      }
                    },
                    ]
            } );

            $('#feedbackList tbody').on('click', 'button', function () {
                var data = table.row($(this).parents('tr')).data();
                console.log(data);
                //alert("Parameter to pass to next page is: " + data._id);
                window.location.href = "editfeedback.html?id=" + data._id;
            });

            $.Toast("Success!","You have retrieved your feeebacks", "success", options);  
            }
            //return response.json();
            });

                //function for submit feedback handled by jquery
                $("#submitFeedback").click(function() {
                        //create empty html variable to be formed as results returned from php file
                        var html = "";

                        fetch("http://localhost:8083/api/v1/feedbacks", {
                        method: "post",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },

                        //make sure to serialize your JSON body
                        body: JSON.stringify({
                            "user": "user1",
                            "type": document.querySelector('input[name="type"]:checked').value,
                            "feedback": document.getElementById('feedback').value,
                            "status": "Pending",
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
                            $.Toast("Success!","You have submitted your feedback", "success", options);
                        setTimeout(function () {
                            window.location.href = "feedback.html"; //will redirect back to registergp page
                         }, 5000); //will call the function after 5 secs
                        }
  
                        //return response.json();
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