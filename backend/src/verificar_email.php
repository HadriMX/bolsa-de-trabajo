<?php

error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once 'core/cors.php';

require_once 'autoload.inc.php';
require_once 'core/sess_handler.php'; // esta línea es necesaria para sobreescribir la implementación de sesiones

$post = json_decode(file_get_contents("php://input"));

$codigo = $post->codigo;

echo json_encode(Auth::verify_email($codigo));
