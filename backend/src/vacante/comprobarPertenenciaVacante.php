<?php
error_reporting(E_ERROR | E_PARSE);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

require_once '../core/cors.php';

require_once '../core/sess_handler.php'; // esta línea es necesaria para sobreescribir la implementación de sesiones
require_once '../autoload.inc.php';
require_once '../core/session_starter.php';

$post = json_decode(file_get_contents("php://input"));

$id_empresa = $_SESSION["currentUser"]["id_usuario"];
$id_vacante = $post->id_vacante;

echo json_encode (Vacante::comprobarPertenenciaVacante($id_empresa, $id_vacante));
?>