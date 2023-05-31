$(document).ready(function() {

    var username = getCookie("name");
    //function to retrieve feedbacks on edit feedback page load
    var objid = (new URL(location.href)).searchParams.get('id');
    console.log(objid);

    //function to retrieve feedbacks on main feedback page load
    fetch('http://localhost:8082/api/v1/Registrations/' + objid + new URLSearchParams({
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
        //document.getElementById(data[0].type).checked = true;
        document.getElementById('basic_forename').value = data[0].basic_forename;
        document.getElementById('basic_surname').value = data[0].basic_surname;
        document.getElementById('basic_dob').value = data[0].basic_dob;
        document.getElementById('basic_height').value = data[0].basic_height;
        document.getElementById('basic_weight').value = data[0].basic_weight;
        document.getElementById('basic_nhsnumber').value = data[0].basic_nhsnumber;
        document.getElementById('basic_country').value = data[0].basic_country;
        document.getElementById('basic_gender').value = data[0].basic_gender;
        document.getElementById('basic_address').value = data[0].basic_address;
        document.getElementById('basic_postcode').value = data[0].basic_postcode;
        document.getElementById('basic_email').value = data[0].basic_email;

        document.getElementById('health_suffered').value = data[0].health_suffered;
        document.getElementById('health_suffereddetails').value = data[0].health_suffereddetails;
        $("input[name=health_operations]").val([data[0].health_operations]);
        $("input[name=health_TB]").val([data[0].health_TB]);
        $("input[name=health_TBCountry]").val([data[0].health_TBCountry]);
        $("input[name=health_smoke]").val([data[0].health_smoke]);
        $("input[name=health_drink]").val([data[0].health_drink]);
        $("input[name=health_disability]").val([data[0].health_disability]);
        document.getElementById('health_disabilitydetails').value = data[0].health_disabilitydetails;
        $("input[name=health_allergy]").val([data[0].health_allergy]);
        document.getElementById('health_allergydetails').value = data[0].health_allergydetails;
        $("input[name=health_medication]").val([data[0].health_medication]);
        document.getElementById('health_medicationdetails').value = data[0].health_medicationdetails;
        document.getElementById('health_exercise').value = data[0].health_exercise;

        document.getElementById('family_illnesss').value = data[0].family_illnesss;
        document.getElementById('family_illnesssdetails').value = data[0].family_illnesssdetails;
        $("input[name=family_carer]").val([data[0].family_carer]);
        document.getElementById('family_carerdetails').value = data[0].family_carerdetails;

        $("input[name=profiling_englishspoken]").val([data[0].profiling_englishspoken]);
        $("input[name=profiling_englishwritten]").val([data[0].profiling_englishwritten]);
        $("input[name=profiling_englishfirst]").val([data[0].profiling_englishfirst]);
        document.getElementById('profiling_religion').value = data[0].profiling_religion;
        document.getElementById('profiling_ethnicgroup').value = data[0].profiling_ethnicgroup;
        
        document.getElementById('gp_borough').value = data[0].gp_borough;
        $('#gp_primary').append(`<option value="${data[0].gpprimary}">
        ${data[0].gpprimary}
        </option>`);
        $('#gp_secondary').append(`<option value="${data[0].gp_secondary}">
        ${data[0].gp_secondary}
        </option>`);

        $("input[name=consent_resident]").val([data[0].consent_resident]);
        $("input[name=consent_eea]").val([data[0].consent_eea]);
        $("input[name=consent_prc]").val([data[0].consent_prc]);
        $("input[name=consent_sms]").val([data[0].consent_sms]);
        $("input[name=consent_email]").val([data[0].consent_email]);

        document.getElementById('gp_comments').value = data[0].gp_comments;

        $.Toast("Success!","You have retrieved your registration detail", "success", options);  
    }
    //return response.json();
});

            //function for update feedback handled by jquery
            $("#updateRegistration").click(function() {

                fetch("http://localhost:8082/api/v1/Registrations/" + objid, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "user": username,
                    "status": "Resubmitted",
                    "basic_forename": document.getElementById('basic_forename').value,
                    "basic_surname": document.getElementById('basic_surname').value,
                    "basic_dob": document.getElementById('basic_dob').value,
                    "basic_height": document.getElementById('basic_height').value,
                    "basic_weight": document.getElementById('basic_weight').value,
                    "basic_nhsnumber": document.getElementById('basic_nhsnumber').value,
                    "basic_country": document.getElementById('basic_country').value,
                    "basic_gender": document.getElementById('basic_gender').value,
                    "basic_address": document.getElementById('basic_address').value,
                    "basic_postcode": document.getElementById('basic_postcode').value,
                    "basic_email": document.getElementById('basic_email').value,

                    "health_suffered": document.getElementById('health_suffered').value,
                    "health_suffereddetails": document.getElementById('health_suffereddetails').value,
                    "health_operations": document.querySelector('input[name="health_operations"]:checked').value,
                    "health_TB": document.querySelector('input[name="health_TB"]:checked').value,
                    "health_TBCountry": document.querySelector('input[name="health_TBCountry"]:checked').value,
                    "health_smoke": document.querySelector('input[name="health_smoke"]:checked').value,
                    "health_drink": document.querySelector('input[name="health_drink"]:checked').value,
                    "health_disability": document.querySelector('input[name="health_disability"]:checked').value,
                    "health_disabilitydetails": document.getElementById('health_disabilitydetails').value,
                    "health_allergy": document.querySelector('input[name="health_allergy"]:checked').value,
                    "health_allergydetails": document.getElementById('health_allergydetails').value,
                    "health_medication": document.querySelector('input[name="health_medication"]:checked').value,
                    "health_medicationdetails": document.getElementById('health_medicationdetails').value,
                    "health_exercise": document.getElementById('health_exercise').value,

                    "family_illnesss": document.getElementById('family_illnesss').value,
                    "family_illnesssdetails": document.getElementById('family_illnesssdetails').value,
                    "family_carer": document.querySelector('input[name="family_carer"]:checked').value,
                    "family_carerdetails": document.getElementById('family_carerdetails').value,

                    "profiling_englishspoken": document.querySelector('input[name="profiling_englishspoken"]:checked').value,
                    "profiling_englishwritten": document.querySelector('input[name="profiling_englishwritten"]:checked').value,
                    "profiling_englishfirst": document.querySelector('input[name="profiling_englishfirst"]:checked').value,
                    "profiling_religion": document.getElementById('profiling_religion').value,
                    "profiling_ethnicgroup": document.getElementById('profiling_ethnicgroup').value,

                    "gp_borough": document.getElementById('gp_borough').value,
                    "gpprimary": document.getElementById('gp_primary').value,
                    "gp_secondary": document.getElementById('gp_secondary').value,

                    "consent_resident": document.querySelector('input[name="consent_resident"]:checked').value,
                    "consent_eea": document.querySelector('input[name="consent_eea"]:checked').value,
                    "consent_prc": document.querySelector('input[name="consent_prc"]:checked').value,
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
                $.Toast("Failure!","You have not submitted your feeeback", "error", options); 
                }
                else {
                $.Toast("Success!","You have updated your GP Registration information", "success", options);
                setTimeout(function () {
                    window.location.href = "registergp.html"; //will redirect back to registergp page
                 }, 5000); //will call the function after 5 secs
                }

                //return response.json();
                });
        });

                //function for delete feedback handled by jquery
                $("#deleteRegistration").click(function() {

                    fetch("http://localhost:8082/api/v1/Registrations/" + objid, {
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
                        $.Toast("Success!","You have deleted your GP Registration information", "success", options);
                        setTimeout(function () {
                            window.location.href = "registergp.html"; //will redirect back to registergp page
                         }, 5000); //will call the function after 5 secs
                        }
    
                    //return response.json();
                    });
            });

                 //function for cancel feedback handled by jquery
                $("#cancel").click(function() {
                    window.location.href = "registergp.html";  
            });
        
    $("#gp_borough").change(function () {
    $('#gp_primary').html("");
    $('#gp_secondary').html("");
    var borough = document.getElementById('gp_borough').value;
    console.log(borough);

    fetch('http://localhost:8081/api/v1/GPs/borough/' + borough + new URLSearchParams({
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
    $.Toast("Failure!","Error in retrieving your gp details", "error", options); 
    }
    else {

        $.each( data, function( key, val ) {
            //forms html variable by appending the result set data using key value pairs from the returned json
            $('#gp_primary').append($('<option></option>').val(val.name).html(val.name));
        });

    }
    //return response.json();
    });

    });

    $("#gp_primary").change(function () {

        var borough = document.getElementById('gp_borough').value;
        console.log(borough);
    
        fetch('http://localhost:8081/api/v1/GPs/borough/recommended/' + borough + '?' + new URLSearchParams({
            primaryGP: document.getElementById('gp_primary').value
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
        $.Toast("Failure!","Error in retrieving your gp details", "error", options); 
        }
        else {
    
            $.each( data, function( key, val ) {
                //forms html variable by appending the result set data using key value pairs from the returned json
                $('#gp_secondary').html("");
                $('#gp_secondary').append($('<option></option>').val(val.name).html(val.name));
            });
    
        }
        //return response.json();
        });
    
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