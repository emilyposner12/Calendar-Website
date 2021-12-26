<?php

ini_set("session.cookie_httponly", 1);
session_start();
header("Content-Type: application/json");
require 'database_calendar.php';
if(empty($_SESSION["username"])){
    exit;
}else{
    $username = $_SESSION["username"];
}
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
$event_id = $json_obj["eventId"]; //htmlentities not needed, auto incremented in table

$stmt = $mysqli->prepare("DELETE FROM events WHERE event_id = ?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "MySql Error"
    ));
    exit;
}
$stmt->bind_param('i', $event_id);
$stmt->execute();

$stmt->close();
echo json_encode(array(
    "success" => true,
    "event_id" => $event_id
));
exit;
