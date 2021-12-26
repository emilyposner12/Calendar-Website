<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly",1);

require("database_calendar.php");
session_start();

if(empty($_SESSION["username"])){
    exit;
}else{
    $username = $_SESSION["username"];
}


$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$shareuser = $json_obj['shareuser'];
$current_event_id = $json_obj['current_event_id'];
if ($username == $shareuser){
    echo json_encode(array(
        "sameuser" => htmlentities((bool)true),
    ));
    exit;
}
$stmt = $mysqli->prepare("SELECT COUNT(*) from users where username=?");
        //bind parameter
        $stmt->bind_param('s', $shareuser);
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
        //username does not exist
        if (!$count>0) {
            echo json_encode(array(
                "success" => htmlentities((bool)false),
                "message" => htmlentities((string)"ERROR: username doesn't exist")
            ));
            exit;
        }
        $stmt->close();


$stmt = $mysqli->prepare("SELECT event, month, day, hour, minute, year, tag FROM events WHERE event_id ='$current_event_id' and username = '$username'");

if(!$stmt){
	echo json_encode(array(
		"sucess" =>false,
		"message"=>"query1 prep failed: %s",$mysqli->error

	));
	exit;
}
$stmt->execute();

$result = $stmt->get_result();

while($row = $result->fetch_assoc()){
	//save event's info
	$shareevent =($row['event']);
	$sharemonth =($row['month']);
	$shareday =($row['day']);
	$sharehour =($row['hour']);
	$shareminute=($row['minute']);
	$shareyear=($row['year']);
    $sharetag=($row['tag']);
}	
$stmt->close();

$stmt = $mysqli->prepare("INSERT INTO events (event,month,day,hour,minute,year,tag,username) VALUES ('$shareevent','$sharemonth','$shareday','$sharehour','$shareminute','$shareyear', '$sharetag', '$shareuser')");

if(!$stmt){
	echo json_encode(array(
		"sucess" =>false,
		"message"=>"query2 prep failed: %s",$mysqli->error

	));
	exit;
}

$stmt->execute();
$stmt->close();
echo json_encode(array(
    "sucess"=> true,
    "message"=>"Editing successful"
));
exit;


?>