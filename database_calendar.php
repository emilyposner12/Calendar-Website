<?php

$mysqli = new mysqli('localhost', 'root', 'Timmy11!', 'calendarSite');

if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}

?>