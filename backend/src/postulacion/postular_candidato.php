<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';

require_once '../core/sess_handler.php'; // esta línea es necesaria para sobreescribir la implementación de sesiones
require_once '../autoload.inc.php';
require_once '../core/session_starter.php';

error_reporting(E_ERROR | E_PARSE);

$post = json_decode(file_get_contents("php://input"));

if($_SESSION['currentUser']['estatus'] == 'A'){
    $id_vacante = $post->id_vacante;
    $id_candidato = $_SESSION['currentUser']['id_usuario'];
    $fecha = (new \DateTime())->format('Y-m-d');
    
    echo json_encode(Postulacion::addPostulacion($id_vacante, $id_candidato, $fecha));
}
