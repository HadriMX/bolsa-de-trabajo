<?php
error_reporting(E_ERROR | E_PARSE);

// include "db_conn.php";
// require_once "error.php";
// require_once "success.php";
require_once '../autoload.inc.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"));
echo json_encode (get_categorias());
function get_categorias(){
    $db = new Db();
    $conn = $db->getConn();
    
    $stmt = $conn->prepare("SELECT  * FROM categorias_activas");
    //$stmt->bind_param();
    
    $stmt->execute();
    $r = $db->readResult($stmt->get_result());
    return new SuccessResult("",$r);
}
?>