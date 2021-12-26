//all user event handling:

function loginAjax(event) {
    const username = document.getElementById("user").value; // Get the username from the form
    const password = document.getElementById("pass").value; // Get the password from the form

    // makes a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };

    fetch("calendar_login.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`))
        location.reload();
}


function registerAjax(event){
    console.log("registerAjax function");
    const newuser = document.getElementById("newuser").value; // Get the username from the form
    const newpass = document.getElementById("newpass").value; // Get the password from the form

    //makes a URL-encoded string for passing POST data:
    const data = { 'newuser': newuser, 'newpass': newpass };
    console.log(newuser);
    fetch("user_registration.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been registered!" : `You were not registered ${data.message}`))
        .catch(err => console.error(err));
    
}
function logoutAjax(event){
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","user_logout.php",true);
	xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhttp.addEventListener("load",logoutCallback,false);
	xhttp.send();
}

function logoutCallback(event){
    var jsonLogoutData = JSON.parse(event.target.responseText);
	if(jsonLogoutData.success){
		alert(jsonLogoutData.message);
        location.reload();
	}
}
function getEventID(id){
    current_event_id = id;          
    openForm();
}
function getShareEventID(id){
    current_event_id = id;          
    openShareForm();
}
function openShareForm(){
    document.getElementById("share_event_popup").style.display = "block";
}
function closeShareForm() {
	document.getElementById("share_event_popup").style.display = "none";
  }
function shareEventAjax(){
    console.log("share event ajax launches");

    const shareuser = document.getElementById("shareuser").value;
    const data = {"shareuser": shareuser, "current_event_id": current_event_id };

    console.log(data);
    
    fetch('share_event.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
                alert(response.success ? "Event shared" : `Sharing event unsuccessful:${data.message}`); 
        })

}
function editEventAjax(){
    console.log("edit event ajax function launches");
    //getting values from the form
    const editevent = document.getElementById("editevent").value;
    const edityear = parseInt(document.getElementById("edityear").value);
    const editmonth = parseInt(document.getElementById("editmonth").value);
    const editday = parseInt(document.getElementById("editday").value);
    const edithour = parseInt(document.getElementById("edithour").value);
    const editminute = parseInt(document.getElementById("editminute").value);
    const edittag = document.getElementById("edittag").value;
    //const token = document.getElementById("token").value;
    //const event_id = parseInt(document.getElementById("event_id").value);

    const data = {"editevent": editevent, "edityear": edityear, "editmonth": editmonth, "editday": editday, "edithour": edithour, "editminute": editminute, "edittag": edittag, "event_id": current_event_id };
    console.log(data);
    
    fetch('edit_event.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(response => {
                updateEvents();
                alert(response.success ? "Event edited" : `Editing event unsuccessful:${response.message}`);
                
        })
        .catch(err => console.error(err));
        location.reload(); 
}

function addEventAjax() {
    const event = document.getElementById("event").value;
    const year = parseInt(document.getElementById("year").value);
    const month = parseInt(document.getElementById("month").value);
    const day = parseInt(document.getElementById("day").value);
    const hour = parseInt(document.getElementById("hour").value);
    const minute = parseInt(document.getElementById("minute").value);
    const tag = document.getElementById("tag").value;

      
    const data = {'event': event, 'year': year, 'month': month, 'day': day, 'hour': hour, 'minute': minute, 'tag': tag};
    fetch("addEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => {
            updateEvents();
            alert(response.success ? "Event added" : `Adding event unsuccessful:${response.message}`);
    })
    location.reload();
}

function shareCalendarAjax(){
    console.log("share event ajax launches");

    const share_calendar_user = document.getElementById("share_calendar_user").value;
    const data = {"share_calendar_user": share_calendar_user};

    console.log(data);
    
    fetch('share_calendar.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        
        .then(response => response.json())
        .then(response => {
                console.log(response)
                alert(response.success ? "Calendar shared" : `Sharing calendar unsuccessful:${response.message}`); 
        })
}

function openForm() {
    document.getElementById("edit_event_popup").style.display = "block";
}
function closeForm() {
	document.getElementById("edit_event_popup").style.display = "none";
}

//buttons attached to above functions
document.getElementById("logout_btn").addEventListener("click", logoutAjax, false);
document.getElementById("register_btn").addEventListener("click", registerAjax, false);
document.getElementById("login_btn").addEventListener("click", loginAjax, false); 
document.getElementById("edit_event_btn").addEventListener("click", editEventAjax, false);
document.getElementById("share_event_btn").addEventListener("click", shareEventAjax, false);
document.getElementById("share_calendar_btn").addEventListener("click", shareCalendarAjax, false);
document.getElementById("add_event_btn").addEventListener("click", addEventAjax, false);

