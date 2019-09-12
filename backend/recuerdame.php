<?php

require_once('sess_handler.php');
require_once('success.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST');
header('content-type: application/json; charset=utf-8');

// $post = json_decode(file_get_contents("php://input"));
// $phpsessid = $post->phpsessid;

$phpsessid = $_GET['phpsessid'];

session_id($phpsessid);
session_start();

$currentUser = $_SESSION['currentUser'];

echo json_encode(new SuccessResult("mamalon", $currentUser));