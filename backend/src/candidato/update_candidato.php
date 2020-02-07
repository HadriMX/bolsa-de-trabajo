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

$uploadCurriculum = FileUpload::check_file_exists("curriculum", $currentUser['id_usuario']) ? $_FILES['curriculum'] : true;
if ($uploadCurriculum) {
    $curriculumResult = FileUpload::upload($_FILES['curriculum'], false, "curriculum");

    if (is_string($curriculumResult)) {
        $candidato['ruta_cv'] = $curriculumResult;
    } else {
        $response = $curriculumResult;
    }
}

$uploadIdentificacion = FileUpload::check_file_exists("identificacion", $currentUser['id_usuario']) ? $_FILES['identificacion'] : true;
if ($uploadIdentificacion) {
    $curriculumResult = FileUpload::upload($_FILES['identificacion'], false, "identificacion");

    if (is_string($curriculumResult)) {
        $candidato['ruta_id'] = $curriculumResult;
    } else {
        $response = $curriculumResult;
    }
}

$uploadCurp = FileUpload::check_file_exists("curp", $currentUser['id_usuario']) ? $_FILES['curp'] : true;
if ($uploadCurp) {
    $curriculumResult = FileUpload::upload($_FILES['curp'], false, "curp");

    if (is_string($curriculumResult)) {
        $candidato['ruta_curp'] = $curriculumResult;
    } else {
        $response = $curriculumResult;
    }
}

if (empty($response)) {
    $response = Candidato::update($candidato);
}

echo json_encode($response);
