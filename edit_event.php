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

//$token=$json_obj['token'];
$edityear = htmlentities($json_obj['edityear']);
$editmonth = htmlentities($json_obj['editmonth']);
$editday = htmlentities($json_obj['editday']);
$edithour= htmlentities($json_obj['edithour']);
$editminute = htmlentities($json_obj['editminute']);
$editevent = htmlentities($json_obj['editevent']);
$event_id = htmlentities($json_obj["event_id"]);
$edittag = htmlentities($json_obj["edittag"]);
/*
if(!hash_equals($_SESSION['token'], $token)){
    die("Request forgery detected");
}
*/


if(empty($editevent) || empty($editmonth) || empty($editday) || empty($edityear) || empty($edithour) || empty($editminute) || empty($edittag)){
    echo json_encode(array(
    "success"=>htmlentities((bool)false),
    "message"=>htmlentities((string)"Empty inputs")
));
exit;
}
    $stmt=$mysqli->prepare("UPDATE events set event =?, month=?, day=?, hour=?, minute=?, year=?, tag=? where event_id=? AND username=?");
    if (!$stmt) {
        echo json_encode(array(
            "success" => htmlentities((bool)false),
            "message" => $mysqli->error
        ));
        exit;
    }
$stmt->bind_param('siiiiisis',$editevent,$editmonth,$editday,$edithour,$editminute,$edityear,$edittag,$event_id,$username);
$stmt->execute();
    echo json_encode(array(
        "success" => true
    ));
    $stmt->close();

exit;

?>