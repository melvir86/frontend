$(document).ready(function() {

    //function for login handled by jquery
    $("#submitLogin").click(function() {

    fetch('http://localhost:8085/api/v1/Users/login?' + new URLSearchParams({
      "username": document.getElementById('username').value,
      "password": document.getElementById('password').value,
      "role": document.getElementById('role').value,
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
    $.Toast("Failure!","Error in retrieving your user details", "error", options); 
    }
    else {
    if (data.length == 0) {
      $.Toast("Failure!","Login error. Pls try again by entering your correct login details", "error", options); 
    }
    else {
      var now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000);
      document.cookie = "name=" + data[0].username; + ";expires=" + now.toUTCString() + "; path=/";
      document.cookie = "role=" + data[0].role; + ";expires=" + now.toUTCString() + "; path=/";
      console.log(document.cookie);
      $.Toast("Success!","You have logged in successfully", "success", options);
      setTimeout(function () {
          window.location.href = "index.html"; //will redirect back to registergp page
       }, 3000); //will call the function after 3 secs
    }
    }

  });
  
});

});