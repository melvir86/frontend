$(document).ready(function() {

    var username = getCookie("name");
    //function to retrieve feedbacks on edit feedback page load
    var objid = (new URL(location.href)).searchParams.get('id');
    console.log(objid);

    fetch('http://localhost:8083/api/v1/feedbacks/' + objid + new URLSearchParams({
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

                fetch("http://localhost:8083/api/v1/feedbacks/" + objid, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
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
                setTimeout(function () {
                    window.location.href = "feedback.html"; //will redirect back to registergp page
                 }, 5000); //will call the function after 5 secs
                }

                //return response.json();
                });
        });

                //function for delete feedback handled by jquery
                $("#deleteFeedback").click(function() {

                    fetch("http://localhost:8083/api/v1/feedbacks/" + objid, {
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

            function getCookie(name) {
                let cookie = {};
                document.cookie.split(';').forEach(function(el) {
                  let [k,v] = el.split('=');
                  cookie[k.trim()] = v;
                })
                return cookie[name];
              }

});