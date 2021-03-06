<?php
error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Allow: GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';
require_once '../autoload.inc.php';
require_once '../core/session_starter.php';

$post = json_decode(file_get_contents("php://input"));

$id_usuario = $_SESSION["currentUser"]["id_usuario"];

echo json_encode (Candidato::get_candidatosInfoCompleta($id_usuario));
?>