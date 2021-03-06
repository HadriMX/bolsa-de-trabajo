<?php

error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Allow: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';
require_once '../autoload.inc.php';

$post = json_decode(file_get_contents("php://input"));
$id_entidad = $post->id_entidad_federativa;
echo json_encode (Municipio::get_municipios($id_entidad));

?>