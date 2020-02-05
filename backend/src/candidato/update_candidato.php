<?php

error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';
require_once '../autoload.inc.php';
require_once '../core/session_starter.php';

$candidato = (array) json_decode($_POST['infoCandidato']);

$response = FileUpload::upload($_FILES['curriculum'], false, "curriculum");

if (is_string($response)) {
    $candidato['ruta_cv'] = $response;
    $response = Candidato::update($candidato);
}

echo json_encode($response);
