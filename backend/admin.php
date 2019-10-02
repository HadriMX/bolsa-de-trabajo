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

$area_estudio1 = "$post->nombre_area";
$id=3;
$estatus="A";


echo json_encode(add_area($id,$area_estudio,$estatus));
function add_area(int $id1,string $area_estudio1,string $estatus1)
{
    $db = new Db();
    $conn = $db->getConn();
    
    $insertar = $conn->prepare("INSERT INTO areas_estudio (id_area_estudio,nombre,estatus)VALUES (?,?,?)");
    $insertar->bind_param("iss",$id1, $area_estudio1,$estatus1);
    $resultado = $insertar->execute();
    if ($resultado==true) {
        $output = new SuccessResult("Registro correcto", true);
    }
    else {
        $err = new ErrorResult("Error de registro", 404);
        $output = $err;
    }
   
    return $output;

}
?>