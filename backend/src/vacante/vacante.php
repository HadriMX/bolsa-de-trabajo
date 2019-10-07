<?php

require_once('sess_handler.php');
require_once('db_conn.php');
require_once('error.php');
require_once('success.php');

error_reporting(E_ERROR | E_PARSE);
session_start();

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X-Php-Session-Id");
header('Access-Control-Allow-Methods: GET');
header('content-type: application/json; charset=utf-8');

echo json_encode(getVacantes());

function getVacantes(){
    $db = new Db();
    $conn = $db->getConn();
    
    $stmt = $conn->prepare("SELECT * FROM vacantes_activos");
    //$stmt->bind_param();
    
    $stmt->execute();
    $r = $db->readResult($stmt->get_result());

    return new SuccessResult("",$r);
}

