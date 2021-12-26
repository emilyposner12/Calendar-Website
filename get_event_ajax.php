<?php
session_start();
header("Content-Type: application/json");
ini_set("session.cookie_httponly",1);

require("database_calendar.php");
if(!isset($_SESSION["username"])){
	echo json_encode(array(
		"userNotLoggedIn" => true
	));
	exit;
}

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
session_start();
$username = $_SESSION['username'];

$month= $json_obj["currMonth"]+ 1;
$year= $json_obj["currYear"];
$day=  $json_obj["currDay"];


$myquery = "SELECT * from events";

$stmt=$mysqli->prepare($myquery);
//$stmt.bind_param("s", $username);
if(!$stmt){
	echo json_encode(array(
		"success" =>false,
		"message"=>"query1 prep failed: %s",$mysqli->error

	));
	exit;
}
$stmt->execute();
$stmt->bind_result($eventId, $eventName, $monthResponse, $dayResponse, $hour, $minute, $yearResponse, $tag, $usernameResponse);
$result=array();
while(($stmt -> fetch())){
		if($yearResponse == $year && $dayResponse == $day && $monthResponse == $month && $username == $usernameResponse){
				$object = array(
					"empty" => false,
					"success"=>true,
					"username"=>$username,
					"event"=>$eventName,
					"event_id"=>$eventId,
					"hour" => $hour,
					"minute" => $minute,
					"tag" => $tag
				);
				array_push($result, $object);
		}
		else{
			$object = array(
				"empty" => true,
				"success"=>true,
				"username"=>"",
				"event"=>"",
				"event_id"=>"",
				"hour" => "",
				"minute" => "",
				"tag" => ""
			);
			array_push($result, $object);	
		}
}
$json = json_encode($result);
echo $json;

$stmt->close();
exit;
?>