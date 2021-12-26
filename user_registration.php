<?php
require 'database_calendar.php';

header("Content-Type: application/json"); 

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$newuser = (string) $json_obj['newuser'];

if( !preg_match('/^[\w_\-]+$/', $newuser) ){
	echo json_encode(array(
        "invalid"=> htmlentities((bool)true),
        "message" => htmlentities((string)"Invalid characters")
    ));
	exit;
}

$newpass = password_hash((string)$json_obj['newpass'], PASSWORD_DEFAULT);

//checks username doesnt already exist
$stmt = $mysqli->prepare("SELECT COUNT(*) from users where username=?");

//bind parameter
$stmt->bind_param('s', $newuser);

if(!$stmt){
    echo json_encode(array(
        "success" => htmlentities((bool)false),
        "message" => htmlentities((string)"ERROR checking database")
    ));
    exit;
}

$stmt->execute();

//bind results
$stmt->bind_result($count);
$stmt->fetch();

//if username already exists
if ($count>0) {
    echo json_encode(array(
        "exists" => htmlentities((bool)true),
    ));
    exit;
}
$stmt->close();


$stmt = $mysqli->prepare("INSERT INTO users (username, password_hash) values (?,?)");

if (!$stmt) {
    echo json_encode(array(
        "success" => htmlentities((bool)false),
        "message" => htmlentities((string)"ERROR inserting into database")
    ));
    exit;
}

$stmt->bind_param('ss', $newuser, $newpass);
$stmt->execute();

echo json_encode(array(
    "success" => htmlentities((bool)true),
    "message" => "User registered"
));
$stmt->close();

session_start();
ini_set("session.cookie_httponly", 1);
$_SESSION['username'] = $newuser;
$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 

?>