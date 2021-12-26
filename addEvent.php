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

$event_id = 0;
$event = htmlentities($json_obj["event"]);
$month = htmlentities($json_obj["month"]);
$day = htmlentities($json_obj["day"]);
$hour = htmlentities($json_obj["hour"]);
$minute = htmlentities($json_obj["minute"]);
$year = htmlentities($json_obj["year"]);
$tag = htmlentities($json_obj["tag"]);

$stmt = $mysqli->prepare("INSERT INTO events VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "MySql Error: " . $mysqli->error
    ));
    exit;
}

$stmt->bind_param('isiiiiiss', $event_id, $event, $month, $day, $hour, $minute, $year, $tag, $username);
$stmt->execute();
$stmt->close();
echo json_encode(array(
    "success" => true,
    "event_id" => $event_id
));
exit;

?>
