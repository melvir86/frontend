$(document).ready(function() {

    var username = getCookie("name");

    //function to retrieve feedbacks on edit feedback page load
    //var objid = (new URL(location.href)).searchParams.get('id');
    //console.log(objid);

    fetch('http://localhost:8081/api/v1/GPs/' + username + new URLSearchParams({
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
    document.getElementById('name').value = data[0].name;
    document.getElementById('address').value = data[0].address;
    document.getElementById('borough').value = data[0].borough;
    document.getElementById('telephone').value = data[0].telephone;
    document.getElementById('maxcapacity').value = data[0].maxcapacity;
    document.getElementById('currentcapacity').value = data[0].currentcapacity;
    document.getElementById('status').value = data[0].status;
    document.getElementById('lastModifiedDate').value = data[0].lastModifiedDate;
    document.getElementById('admin').value = data[0].admin;
    document.getElementById('objid').value = data[0]._id;

    $.Toast("Success!","You have retrieved your gp detail", "success", options);  
    }
    //return response.json();
    });

        //function for update feedback handled by jquery
        $("#updateGP").click(function() {
                var objid = document.getElementById('objid').value;
                console.log(objid);
                console.log(document.getElementById('name').value);

                fetch("http://localhost:8081/api/v1/GPs/" + objid, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    "name": document.getElementById('name').value,
                    "address": document.getElementById('address').value,
                    "borough": document.getElementById('borough').value,
                    "telephone": document.getElementById('telephone').value,
                    "maxcapacity": document.getElementById('maxcapacity').value,
                    "currentcapacity": document.getElementById('currentcapacity').value,
                    "status": document.getElementById('status').value,
                    "admin": document.getElementById('admin').value
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
                $.Toast("Success!","You have updated your GP details", "success", options);  
                }

                //return response.json();
                });
        });

                 //function for cancel feedback handled by jquery
                $("#cancelGP").click(function() {
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