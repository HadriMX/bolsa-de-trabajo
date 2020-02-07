<?php

error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once 'core/cors.php';
require_once 'autoload.inc.php';
require_once 'core/session_starter.php';

$newFileName = $_GET['rename'] ?? "";
$noReplace = false;

if (isset($_GET['no_replace'])) {
    $noReplace = $_GET['no_replace'] == "true" ? true : false;
}

$response = FileUpload::upload($_FILES['archivo'], $noReplace, $newFileName);

echo json_encode($response);
