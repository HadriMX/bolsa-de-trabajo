<?php
error_reporting(E_ERROR | E_PARSE);


require_once '../autoload.inc.php';


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"));

$area_estudio = "$post->nombre";
$estatus="A";



if ($area_estudio<>''){
    echo json_encode(Area::add_area($area_estudio, $estatus));
}
?>