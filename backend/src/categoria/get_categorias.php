<?php
error_reporting(E_ERROR | E_PARSE);



header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

require_once '../core/cors.php';

require_once '../autoload.inc.php';
require_once '../core/session_starter_admin.php';

$post = json_decode(file_get_contents("php://input"));
echo json_encode (Categoria::get_categoriasAdmin());
?>