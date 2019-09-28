<?php
error_reporting(E_ERROR | E_PARSE);
include "db_conn.php";
require_once "error.php";
require_once "success.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');
$post = json_decode(file_get_contents("php://input"));
$area_estudio = $post->nombre_area;


function add_area(string $area_estudio)
{
    $db = new Db();
    $conn = $db->getConn();
    
    $insert = $conn->prepare("INSERT INTO areas_estudio (id_area_estudio,nombre,estatus)VALUES ('3',?,'A')");
    $insertar->bind_param("s", $area_estudio)
    $resultado = $insert->execute();
    if ($resultado==true) {
        $output = new SuccessResult("Registro correcto", true);
    }
    else {
        $err = new ErrorResult("Error de registro", 401);
        $output = $err;
    }
   
    return $output;

}
?>