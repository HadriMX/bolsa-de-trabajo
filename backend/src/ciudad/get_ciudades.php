<?php
error_reporting(E_ERROR | E_PARSE);


require_once '../autoload.inc.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');


$post = json_decode(file_get_contents("php://input"));
$id_entidad = $post->id_entidad_federativa;
$id_municipio = $post->id_municipio;
echo json_encode (Ciudad::get_ciudades($id_entidad,$id_municipio));

?>