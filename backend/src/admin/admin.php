<?php
error_reporting(E_ERROR | E_PARSE);

// include "db_conn.php";
// require_once "error.php";
// require_once "success.php";
require_once '../autoload.inc.php';


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"));

$area_estudio = "$post->nombre_area";
$categoria="$post->nombre_categoria";
$estatus="A";



if ($area_estudio<>''){
    echo json_encode(Admin::add_area($area_estudio,$estatus));
}
else{
    echo json_encode(Admin::add_categoria($categoria,$estatus));
}

?>