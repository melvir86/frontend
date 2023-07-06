            $(document).ready(function() {

            var username = getCookie("name");
            //function to retrieve feedbacks on main feedback page load
            fetch('http://localhost:8083/api/v1/feedbacks' + new URLSearchParams({
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
                            return '<button disabled>Acknowledge</button>';
                        }
                        else {
                          return '<button disabled>Acknowledge</button>';
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

            $.Toast("Success!","You have retrieved all the feeebacks", "success", options);  
            }
            //return response.json();
            });

                function getCookie(name) {
                    let cookie = {};
                    document.cookie.split(';').forEach(function(el) {
                      let [k,v] = el.split('=');
                      cookie[k.trim()] = v;
                    })
                    return cookie[name];
                  }

    });