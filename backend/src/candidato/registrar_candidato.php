<?php

error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';
require_once '../autoload.inc.php';
require_once '../core/sess_handler.php'; // esta línea es necesaria para sobreescribir la implementación de sesiones

$candidato = (array) json_decode($_POST['infoCandidato']);
$codigoConfirmacion = $_POST['codigoConfirmacion'];

$response = array();

$db = new Db();
$conn = $db->getConn();
$stmt = $conn->prepare("SELECT * FROM usuarios_activos WHERE codigo_confirmacion = ?");
$stmt->bind_param("s", $codigoConfirmacion);
$stmt->execute();
$r = $db->readResult($stmt->get_result());

if (empty($r)) {
    $response = new ErrorResult("El usuario no existe.", 404);
}

$currentUser = $r[0];

$curriculumResult = FileUpload::upload($_FILES['curriculum'], "curriculum", $currentUser['id_usuario']);

if (is_string($curriculumResult)) {
    $candidato['ruta_cv'] = $curriculumResult;
} else {
    $response = $curriculumResult;
}

if (empty($response)) {
    $response = Candidato::registrar($candidato, $currentUser['id_usuario']);
}

echo json_encode($response);
