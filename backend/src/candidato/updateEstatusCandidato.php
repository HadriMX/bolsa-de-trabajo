<?php
error_reporting(E_ERROR | E_PARSE);


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

require_once '../core/cors.php';
require_once '../autoload.inc.php';



$post = json_decode(file_get_contents("php://input"));

$estatus =$post->estatus;
$id_usuario = $post->id_usuario;
echo json_encode(Candidato::updateEstatusCandidato($estatus,$id_usuario));

?>