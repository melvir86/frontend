$(document).ready(function() {

    var username = getCookie("name");

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8082/api/v1/Registrations/registered/user?' + new URLSearchParams({
        "user": username,
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
    $.Toast("Failure!","Error in retrieving your registration details", "error", options); 
    }
    else {

        $.each( data, function( key, val ) {
            //forms html variable by appending the result set data using key value pairs from the returned json
            $('#appointment_gp').append($('<option></option>').val(val.gpprimary).html(val.gpprimary));
            $('#appointment_gp').append($('<option></option>').val(val.gp_secondary).html(val.gp_secondary));
        });

    }
    //return response.json();
    });

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8084/api/v1/Appointments/user?' + new URLSearchParams({
        "user": username,
        "status": "Submitted",
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
    $.Toast("Failure!","Error in retrieving your appointments", "error", options); 
    }
    else {
        var table = $('#appointmentList').DataTable( {
            data: data,
            "columns": [
            { "data": "_id", "name": "Id", "title": "Id", "visible": false },
            { "data": "createdDate", "name": "Created Date", "title": "Created Date" },
            { "data": "lastModifiedDate", "name": "Last Modified Date", "title": "Last Modified Date" },
            { "data": "appointment_type", "name": "Appointment Type", "title": "Appointment Type" },
            { "data": "appointment_symptom", "name": "Symptom", "title": "Symptom" },
            { "data": "appointment_doctor", "name": "Preferred Doctor", "title": "Preferred Doctor" },
            { "data": "status", "name": "Status", "title": "Status" },
            { "data": "appointment_datetime", "name": "Scheduled Slot", "title": "Scheduled Slot" },
            { "data": "", "name": "", "title": "Action",
            render: function (data, type, row, meta) {
                if (row.status == "Submitted" || row.status == "Resubmitted" || row.status == "Information request by GP") {
                  $("#smarttab").empty();
                  $("#smarttab").append("You are not allowed to create another Appointment booking request while your current request is being processed!");
                  return '<button>Edit</button>';
                }
                else {
                  return '<button disabled>Edit</button>';
                }
              }
            },
            ],
    } );

    $('#appointmentList tbody').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        console.log(data);
        //alert("Parameter to pass to next page is: " + data._id);
        window.location.href = "editappointment.html?id=" + data._id;
    });

    $.Toast("Success!","You have retrieved your appointments", "success", options);  
    }
    //return response.json();
});

            //function for update feedback handled by jquery
            $("#submitAppointment").click(function() {

                fetch("http://localhost:8084/api/v1/Appointments/", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "user": username,
                    "status": "Submitted",
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
                    $.Toast("Success!","You have submitted your Appointment booking request", "success", options);
                    setTimeout(function () {
                        window.location.href = "appointment.html"; //will redirect back to appointment page
                     }, 5000); //will call the function after 5 secs
                }

                //return response.json();
                });
        });

        //function for cancel feedback handled by jquery
        $("#cancelAppointment").click(function() {
            window.location.href = "index.html";  
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