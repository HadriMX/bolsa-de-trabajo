<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once 'core/cors.php';

require_once 'autoload.inc.php';
require_once 'core/session_starter.php';

$logout = session_destroy();

if ($logout) {
    echo json_encode(new SuccessResult("Logout OK", $logout));
} else {
    echo json_encode(new ErrorResult("Error... algo pasó.", 509));
}
