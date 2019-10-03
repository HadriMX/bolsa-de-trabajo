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

$area_estudio = "$post->nombre_area";
$categoria="$post->nombre_categoria";
$estatus="A";

// if ($area_estudio<>''){
//     echo json_encode(add_area($area_estudio,$estatus));
// }
// else{
//     echo json_encode(add_categoria($categoria,$estatus));
// }
// echo json_encode(add_area($area_estudio,$estatus), add_categoria($categoria,$estatus));
 echo json_encode(get_areas());

function add_area(string $area_estudio,string $estatus)
{
   
    if ($area_estudio<>''){
        
        
        $db = new Db();
        $conn = $db->getConn();
        $insertar = $conn->prepare("INSERT INTO areas_estudio (nombre,estatus)VALUES (?,?)");
        $insertar->bind_param("ss",$area_estudio,$estatus);
        $resultado = $insertar->execute();
        if ($resultado==true) {
            $output = new SuccessResult("Registro correcto", true);
        }
        else {
            $err = new ErrorResult("Error de registro", 401);
            $output = $err;
        }
    
    }
    return $output;

}


function add_categoria(string $categoria,string $estatus){
    
    if($categoria<>''){
        
        $db = new Db();
        $conn = $db->getConn();
        $insertar = $conn->prepare("INSERT INTO tipos_empresa (nombre_empresa,estatus)VALUES (?,?)");
        $insertar->bind_param("ss",$categoria,$estatus);
        $resultado = $insertar->execute();
        if ($resultado==true) {
            $output = new SuccessResult("Registro correcto", true);
        }
        else {
            $err = new ErrorResult("Error de registro", 401);
            $output = $err;
        }
    }
    return $output;
}



function get_areas(){
    $db = new Db();
    $conn = $db->getConn();
    
    $stmt = $conn->prepare("SELECT  * FROM areasactivas");
    //$stmt->bind_param();
    
    $stmt->execute();
    $r = $db->readResult($stmt->get_result());
    return new SuccessResult("",$r);
}
    

?>