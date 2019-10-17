<?php
require_once '../autoload.inc.php';

error_reporting(E_ERROR | E_PARSE);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST');
header('content-type: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"));


$areaEstudio = (array) $post;

echo json_encode (Admin::update_areaEstudio($areaEstudio));
?> 