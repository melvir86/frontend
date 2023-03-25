    $(document).ready(function() {
        alert('testt');
                //function for send query button click handled by jquery
                $("#submitFeedback").click(function() {
                    alert("Came here");
                        //create empty html variable to be formed as results returned from php file
                        var html = "";
                        
                        //makes a function call to php file sending required query params for processing of results
                        $.getJSON("iwt-cw.php", { year: document.getElementById('year').value, //query string params
                        winner: document.getElementById('winner').value,
                        runnerUp: document.getElementById('runner-up').value,            
                        file: document.getElementById('file').value,     
                        yearOp: document.getElementById('year-op').value,     
                        tournament: document.getElementById('tournament').value },     
                        function(result){ //result is a json object
                                //displays error message from json key as per requirement
                                if(result['error']){
                                    $('#error').html(result['error']);
                                    $("#output").empty();
                                }
                                else{
                                //console.log(result);
                                //preps table with required headings if response from function call is successful
                                html +='<table border="1">';
                                html +='<tr>';
                                html +='<th>Year</th>';
                                html +='<th>Tournament</th>';
                                html +='<th>Winner</th>';
                                html +='<th>Runner-up</th>';
                                html +='</tr>';
                            $.each( result, function( key, val ) {
                                //console.log(key);
                                //console.log(val);
                                //forms html variable by appending the result set data using key value pairs from the returned json
                                html +='<tr>';
                                html +='<td>'+ val.year + '</td>';
                                html +='<td>'+ val.tournament + '</td>';
                                html +='<td>'+ val.winner + '</td>';
                                html +='<td>'+ val['runner-up'] + '</td>';
                                html +='</tr>';
                            });
                            //closes table tag and writes table to empty output div tag as per requirements
                            html +='</table>';
                            $('#output').html(html);
                            $("#error").empty();
                            }
                        })
                        //fail function prepped in the event of unplanned returned error and will write to empty error div tag
                        .fail(function (jqxhr, status, error) { 
                            document.getElementById('error').innerHTML = error;
                         }
                            );
                    });

        var dataSet = [
            ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
            ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
            ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '1562', '2009/01/12', '$86,000'],
            ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '6224', '2012/03/29', '$433,060'],
            ['Airi Satou', 'Accountant', 'Tokyo', '5407', '2008/11/28', '$162,700'],
            ['Brielle Williamson', 'Integration Specialist', 'New York', '4804', '2012/12/02', '$372,000'],
            ['Herrod Chandler', 'Sales Assistant', 'San Francisco', '9608', '2012/08/06', '$137,500'],
            ['Rhona Davidson', 'Integration Specialist', 'Tokyo', '6200', '2010/10/14', '$327,900'],
            ['Colleen Hurst', 'Javascript Developer', 'San Francisco', '2360', '2009/09/15', '$205,500'],
            ['Sonya Frost', 'Software Engineer', 'Edinburgh', '1667', '2008/12/13', '$103,600'],
            ['Jena Gaines', 'Office Manager', 'London', '3814', '2008/12/19', '$90,560'],
            ['Quinn Flynn', 'Support Lead', 'Edinburgh', '9497', '2013/03/03', '$342,000'],
            ['Charde Marshall', 'Regional Director', 'San Francisco', '6741', '2008/10/16', '$470,600'],
            ['Haley Kennedy', 'Senior Marketing Designer', 'London', '3597', '2012/12/18', '$313,500'],
            ['Tatyana Fitzpatrick', 'Regional Director', 'London', '1965', '2010/03/17', '$385,750'],
            ['Michael Silva', 'Marketing Designer', 'London', '1581', '2012/11/27', '$198,500'],
            ['Paul Byrd', 'Chief Financial Officer (CFO)', 'New York', '3059', '2010/06/09', '$725,000'],
            ['Gloria Little', 'Systems Administrator', 'New York', '1721', '2009/04/10', '$237,500'],
            ['Bradley Greer', 'Software Engineer', 'London', '2558', '2012/10/13', '$132,000'],
            ['Dai Rios', 'Personnel Lead', 'Edinburgh', '2290', '2012/09/26', '$217,500'],
            ['Jenette Caldwell', 'Development Lead', 'New York', '1937', '2011/09/03', '$345,000'],
            ['Yuri Berry', 'Chief Marketing Officer (CMO)', 'New York', '6154', '2009/06/25', '$675,000'],
            ['Caesar Vance', 'Pre-Sales Support', 'New York', '8330', '2011/12/12', '$106,450'],
            ['Doris Wilder', 'Sales Assistant', 'Sydney', '3023', '2010/09/20', '$85,600'],
            ['Angelica Ramos', 'Chief Executive Officer (CEO)', 'London', '5797', '2009/10/09', '$1,200,000'],
            ['Gavin Joyce', 'Developer', 'Edinburgh', '8822', '2010/12/22', '$92,575'],
            ['Jennifer Chang', 'Regional Director', 'Singapore', '9239', '2010/11/14', '$357,650'],
            ['Brenden Wagner', 'Software Engineer', 'San Francisco', '1314', '2011/06/07', '$206,850'],
            ['Fiona Green', 'Chief Operating Officer (COO)', 'San Francisco', '2947', '2010/03/11', '$850,000'],
            ['Shou Itou', 'Regional Marketing', 'Tokyo', '8899', '2011/08/14', '$163,000'],
            ['Michelle House', 'Integration Specialist', 'Sydney', '2769', '2011/06/02', '$95,400'],
            ['Suki Burks', 'Developer', 'London', '6832', '2009/10/22', '$114,500'],
            ['Prescott Bartlett', 'Technical Author', 'London', '3606', '2011/05/07', '$145,000'],
            ['Gavin Cortez', 'Team Leader', 'San Francisco', '2860', '2008/10/26', '$235,500'],
            ['Martena Mccray', 'Post-Sales support', 'Edinburgh', '8240', '2011/03/09', '$324,050'],
            ['Unity Butler', 'Marketing Designer', 'San Francisco', '5384', '2009/12/09', '$85,675'],
        ];

        $('#example').DataTable({
            data: dataSet,
            columns: [
                { title: 'Name' },
                { title: 'Position' },
                { title: 'Office' },
                { title: 'Extn.' },
                { title: 'Start date' },
                { title: 'Salary' },
            ],
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
                
        //function for clear input button click handled by jquery
        $("#clear-input").click(function() {
            //resets back to default values as per requirements
            document.getElementById('year').value = ''
            document.getElementById('winner').value = ''
            document.getElementById('runner-up').value = ''

            $("#file").val('mens-grand-slam-winners.json');
            $("#year-op").val('=');
            $("#tournament").val('Any');
        });

        //function for clear output button click handled by jquery
        $("#clear-output").click(function() {
            //clears the table information for the output tag as per requirements
            $("#output").empty();
        });

    });