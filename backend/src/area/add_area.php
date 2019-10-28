<?php

error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';

require_once '../autoload.inc.php';
require_once '../core/session_starter_admin.php';

$post = json_decode(file_get_contents("php://input"));

$area_estudio = "$post->nombre";
$estatus = "A";

if ($area_estudio != '') {
    echo json_encode(Area::add_area($area_estudio, $estatus));
}
