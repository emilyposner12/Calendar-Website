<?php
require 'database_calendar.php'; 

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = $json_obj['username'];
//$username = (string) $json_obj['username'];
$password = $json_obj['password'];

// Check to see if the username and password are valid
$stmt = $mysqli->prepare("SELECT COUNT(*), password_hash FROM users WHERE username=?");

if(!$stmt){
	$error = printf("Query Prep Failed: %s\n", $mysqli->error);

	echo json_encode(array(
		"success" => false,
		"message" => $error
	));
	
	exit;
}
//bind parameters
$stmt->bind_param('s', $username);
$stmt->execute();


//bind results
$stmt->bind_result($count, $pwd_hash);
$stmt->fetch();

if($count == 1 && password_verify($password, $pwd_hash)){
	session_start();
    ini_set("session.cookie_httponly", 1);
	$_SESSION['username'] = $username;
	$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 

	echo json_encode(array(
		"success" => true
	));
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	
}
exit;
?>



