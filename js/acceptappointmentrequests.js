$(document).ready(function() {

    var username = getCookie("name");
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
        //document.getElementById(data[0].type).checked = true;
        $('#appointment_gp').append($('<option></option>').val(data[0].gp).html(data[0].gp));

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
            $("#requestinformation").click(function() {

                fetch("http://localhost:8084/api/v1/Appointments/" + objid, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "status": "Information request by GP",
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
                    $.Toast("Success!","You have routed request back to patient to request more information", "success", options);
                setTimeout(function () {
                    window.location.href = "intray.html"; //will redirect back to registergp page
                 }, 5000); //will call the function after 5 secs
                }

                //return response.json();
                });
        });

            //function for update feedback handled by jquery
            $("#acceptAppointment").click(function() {

                fetch("http://localhost:8084/api/v1/Appointments/" + objid, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "status": "Accepted",
                    "gp": document.getElementById('appointment_gp').value,
                    "appointment_type": document.getElementById('appointment_type').value,
                    "appointment_symptom": document.getElementById('appointment_symptom').value,
                    "appointment_cause": document.getElementById('appointment_cause').value,
                    "appointment_worry": document.getElementById('appointment_worry').value,
                    "appointment_duration": document.getElementById('appointment_duration').value,
                    "appointment_symptomstatus": document.getElementById('appointment_symptomstatus').value,
                    "appointment_improvement": document.getElementById('appointment_improvement').value,
                    "appointment_doctor": document.getElementById('appointment_doctor').value,
                    "appointment_datetime": document.getElementById('appointment_datetime').value,

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
                    $.Toast("Success!","You have accepted the GP Appointment request", "success", options);
                setTimeout(function () {
                    window.location.href = "intray.html"; //will redirect back to registergp page
                 }, 5000); //will call the function after 5 secs
                }

                //return response.json();
                });
        });

            //function for update feedback handled by jquery
            $("#rejectAppointment").click(function() {

                fetch("http://localhost:8084/api/v1/Appointments/" + objid, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "status": "Rejected",
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
                    $.Toast("Success!","You have rejected the GP Appointment request", "success", options);
                setTimeout(function () {
                    window.location.href = "intray.html"; //will redirect back to registergp page
                 }, 5000); //will call the function after 5 secs
                }

                //return response.json();
                });
        });

                 //function for cancel feedback handled by jquery
                $("#cancel").click(function() {
                    window.location.href = "intray.html";  
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