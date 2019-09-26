<?php

require_once './core/sess_handler.php'; // esta línea es necesaria para sobreescribir la implementación de sesiones
require_once 'autoload.inc.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST');
header('content-type: application/json; charset=utf-8');

if (isset($_GET['phpsessid'])) {
    session_id($_GET['phpsessid']);
}

session_start();
$logout = session_destroy();

if ($logout) {
    echo json_encode(new SuccessResult("Logout OK", $logout));
}
else {
    echo json_encode(new ErrorResult("Error... algo pasó.", 509));
}
