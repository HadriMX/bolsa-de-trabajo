<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Allow: GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';

require_once '../autoload.inc.php';
require_once '../core/session_starter.php';

$response = getVacantes();
echo json_encode($response);

function getVacantes()
{
    $db = new Db();
    $conn = $db->getConn();

    $stmt = $conn->prepare("SELECT * FROM vacantes_activos");
    //$stmt->bind_param();

    $stmt->execute();
    $r = $db->readResult($stmt->get_result());
    return new SuccessResult("", $r);
}
