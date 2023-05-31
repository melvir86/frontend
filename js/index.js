    $(document).ready(function() {

        var username = getCookie("name");
        var role = getCookie("role");

        console.log(username);
        console.log(role);

        //redirect back to login page if cookie is empty
        if (username === undefined) {
            var options = {
                position_class:"toast-top-right",
                has_progress:true,
            }
            
            $.Toast("Failure!","Your session has expired. You will be redirected to login again", "error", options); 
            setTimeout(function () {
                window.location.href = "login.html"; //will redirect back to registergp page
             }, 3000); //will call the function after 5 secs
        }

        $("#logout").empty();
        $("#logout").append("<br/><a href=login.html>Logout</a>");
        //$("#page-container").empty();
        $("#page-container").append("Welcome <b>" + username + "</b>! Your role is as a <b>" + role + "</b>");


        if (role == "patient") {
            $("#sidemenu").empty();
            $("#sidemenu").append("<li><a href=index.html>Announcements</a></li> \
            <li><a href=registergp.html>Register for GP</a></li> \
            <li><a href=appointment.html>Book GP Appointment</a></li> \
            <li><a href=feedback.html>Feedback</a></li>");
        }
        else if (role == "gpadmin") {
            $("#sidemenu").empty();
            $("#sidemenu").append("<li><a href=index.html>Announcements</a></li> \
            <li><a href=editgpdetails.html>View & Update GP Details</a></li> \
            <li><a href=intray.html>Intray / Inbox</a></li> \
            <li><a href=feedback.html>Feedback</a></li>");
        }
        else {
            $("#sidemenu").empty();
            $("#sidemenu").append("<li><a href=index.html>Announcements</a></li> \
            <li><a href=feedback.html>Feedback</a></li> \
            <li><a href=dashboard.html>View Statistics Dashboard</a></li>");
        }

        function getCookie(name) {
            let cookie = {};
            document.cookie.split(';').forEach(function(el) {
              let [k,v] = el.split('=');
              cookie[k.trim()] = v;
            })
            return cookie[name];
          }

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