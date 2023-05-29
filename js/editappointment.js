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

});