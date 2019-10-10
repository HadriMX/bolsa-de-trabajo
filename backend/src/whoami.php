<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Allow: GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once 'core/cors.php';

require_once 'autoload.inc.php';
require_once 'core/session_starter.php';

if (isset($_SESSION['currentUser'])) {
    $currentUser = $_SESSION['currentUser'];
    echo json_encode(new SuccessResult("Usuario actual OK", $currentUser));
} else {
    echo json_encode(new ErrorResult("No hay usuario actual", 404));
}
