$(document).ready(function() {

    var admin = "User1";

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8081/api/v1/GPs/' + admin + new URLSearchParams({
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
    $.Toast("Failure!","Error in retrieving your GP capacity details", "error", options); 
    }
    else {
    gp_primary = data[0].name;
    document.getElementById('name').value = data[0].name;
    document.getElementById('maxcapacity').value = data[0].maxcapacity;
    document.getElementById('currentcapacity').value = data[0].currentcapacity;
    document.getElementById('remainingcapacity').value = data[0].maxcapacity - data[0].currentcapacity;
    document.getElementById('gpid').value = data[0]._id;
    
    //$.Toast("Success!","You have retrieved your gp detail", "success", options);  

    //function to concurrently retrieve registrations based on pulled primary gp information
    fetch('http://localhost:8082/api/v1/Registrations/gp_primary?' + new URLSearchParams({
        "gp_primary": gp_primary,
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
    $.Toast("Failure!","Error in retrieving registration requests", "error", options); 
    }
    else {
        var table = $('#registrationList').DataTable( {
            data: data,
            "columns": [
            { "data": "_id", "name": "Id", "title": "Id", "visible": false },
            { "data": "basic_forename", "name": "Forename", "title": "Forename" },
            { "data": "basic_surname", "name": "Surname", "title": "Surname" },
            { "data": "createdDate", "name": "Created Date", "title": "Created Date" },
            { "data": "lastModifiedDate", "name": "Last Modified Date", "title": "Last Modified Date" },
            { "data": "gp_borough", "name": "Borough", "title": "Borough" },
            { "data": "gpprimary", "name": "Primary GP", "title": "Primary GP" },
            { "data": "status", "name": "Status", "title": "Status" },
            { "data": "", "name": "", "title": "Action",
            render: function (data, type, row, meta) {
                if (row.status == "Submitted" || row.status == "Resubmitted") {
                  return '<button>View Details to Approve/Reject</button>';
                }
                else {
                  return '<button disabled>View Details to Approve/Reject</button>';
                }
              }
            },
            ],
    } );

    $('#registrationList tbody').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        console.log(data);

        //alert("Parameter to pass to next page is: " + data._id);
        window.location.href = "approveregistrationrequests.html?id=" + data._id + "&gpid=" + document.getElementById('gpid').value + "&capacity=" + document.getElementById('currentcapacity').value;
    });

    //$.Toast("Success!","You have retrieved all registration requests", "success", options);  
    }

    //function to concurrently retrieve appointments based on pulled primary gp information
    fetch('http://localhost:8084/api/v1/Appointments/gp?' + new URLSearchParams({
        "gp": gp_primary,
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
    $.Toast("Failure!","Error in retrieving appointment requests", "error", options); 
    }
    else {
        var table = $('#appointmentList').DataTable( {
            data: data,
            "columns": [
            { "data": "_id", "name": "Id", "title": "Id", "visible": false },
            { "data": "user", "name": "Name", "title": "Name" },
            { "data": "createdDate", "name": "Created Date", "title": "Created Date" },
            { "data": "lastModifiedDate", "name": "Last Modified Date", "title": "Last Modified Date" },
            { "data": "appointment_type", "name": "Appointment Type", "title": "Appointment Type" },
            { "data": "appointment_symptom", "name": "Symptom", "title": "Symptom" },
            { "data": "appointment_doctor", "name": "Preferred Doctor", "title": "Preferred Doctor" },
            { "data": "status", "name": "Status", "title": "Status" },
            { "data": "appointment_datetime", "name": "Scheduled Slot", "title": "Scheduled Slot" },
            { "data": "", "name": "", "title": "Action",
            render: function (data, type, row, meta) {
                if (row.status == "Submitted" || row.status == "Resubmitted") {
                  return '<button>View Details to Accept/Reject</button>';
                }
                else {
                  return '<button disabled>View Details to Accept/Reject</button>';
                }
              }
            },
            ],
    } );

    $('#appointmentList tbody').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        console.log(data);
        //alert("Parameter to pass to next page is: " + data._id);
        window.location.href = "acceptappointmentrequests.html?id=" + data._id;
    });

    $.Toast("Success!","You have retrieved all your registration and appointment requests", "success", options);  
    }
    //return response.json();
});

});
    }


    });

});