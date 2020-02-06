<?php

error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';
require_once '../autoload.inc.php';
require_once '../core/session_starter_candidato.php';

$candidato = (array) json_decode($_POST['infoCandidato']);

$currentUser = $_SESSION['currentUser'];
$response = array();

$uploadCurriculum = false;
if (FileUpload::check_file_exists("curriculum", $currentUser['id_usuario'])) {
    if ($_FILES['curriculum']) {
        $uploadCurriculum = true;
    }
} else {
    $uploadCurriculum = true;
}

if ($uploadCurriculum) {
    $curriculumResult = FileUpload::upload($_FILES['curriculum'], false, "curriculum");

    if (is_string($curriculumResult)) {
        $candidato['ruta_cv'] = $curriculumResult;
    } else {
        $response = $curriculumResult;
    }
}

if (empty($response)) {
    $response = Candidato::update($candidato);
}

// $candidato['ruta_id'] = $currentUser['ruta_id'] ?? FileUpload::upload($_FILES['identificacion'], false, "identificacion");
// $candidato['ruta_curp'] = $currentUser['ruta_curp'] ?? FileUpload::upload($_FILES['curp'], false, "curp");

echo json_encode($response);
