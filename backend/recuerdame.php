<?php

require_once('sess_handler.php');
require_once('success.php');
require_once('error.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST');
header('content-type: application/json; charset=utf-8');

if (isset($_GET['phpsessid'])) {
    session_id($_GET['phpsessid']);
}

session_start();

if (isset($_SESSION['currentUser'])) {
    $currentUser = $_SESSION['currentUser'];
    echo json_encode(new SuccessResult("Usuario actual OK", $currentUser));
}
else {
    echo json_encode(new ErrorResult("No hay usuario actual", 404));
}
