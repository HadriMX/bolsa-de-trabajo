<?php

error_reporting(E_ERROR | E_PARSE);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

require_once '../core/cors.php';
require_once '../autoload.inc.php';
require_once '../core/session_starter.php';

$candidato = (array) json_decode($_POST['infoCandidato']);

$uploadMaxFilesize = ini_get('upload_max_filesize');
$newFileName = $_GET['rename'] ?? "";
$noReplace = false;

if (isset($_GET['no_replace'])) {
    $noReplace = $_GET['no_replace'] == "true" ? true : false;
}

$phpFileUploadErrors = array(
    0 => 'Éxito.',
    1 => 'El tamaño del archivo excede el tamaño máximo permitido (' . $uploadMaxFilesize . ').',
    2 => 'El tamaño del archivo excede el tamaño máximo permitido por el formulario.',
    3 => 'El archivo solo se subió parcialmente.',
    4 => 'No se subió ningún archivo.',
    6 => 'Error en el servidor: falta carpeta temporal.',
    7 => 'Error en el servidor: error al escribir en disco.',
    8 => 'Error en el servidor: una extensión detuvo la subida.',
);

$response = array();
$uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';

if ($_FILES['curriculum']) {
    $uploadFileName = $_FILES['curriculum']['name'];
    $tmpUploadedFilename = $_FILES['curriculum']['tmp_name'];
    $error = $_FILES['curriculum']['error'];

    if ($error > 0) {
        $response = new ErrorResult($phpFileUploadErrors[$error], $error);
    } else {
        if ($newFileName != "") {
            $uploadFileName = $newFileName;
        }

        $prefix = $noReplace ? time() . rand(10, 99) : "";
        $uploadFileName = preg_replace('/[\s,_]+/', '-', $uploadFileName);
        $fileName = strtolower($prefix . "_" . $_SESSION['currentUser']['id_usuario'] . "_" . $uploadFileName);
        $fileName = basename($fileName);
        $fullFilePath = $uploadDir . $fileName;

        if (move_uploaded_file($tmpUploadedFilename, $fullFilePath)) {
            $fileData = array('file_name' => $fileName);

            // $response = new SuccessResult("Archivo subido correctamente.", $fileData);
        } else {
            $response = new ErrorResult("Error al guardar el archivo en el servidor.", 500);
        }
    }
} else {
    $response = new ErrorResult("No se envió ningún archivo.", 400);
}

if (empty($response))
    $response = Candidato::update($candidato);

echo json_encode($response);
 