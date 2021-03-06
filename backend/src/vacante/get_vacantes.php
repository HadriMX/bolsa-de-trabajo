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

echo json_encode(Vacante::get());
