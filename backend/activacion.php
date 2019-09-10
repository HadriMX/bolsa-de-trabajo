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
//recogemos los valores enviados por el link de activacion que mandamos por mail
$codigo=$_GET['codigo'];
$email=$_GET['email'];

echo json_encode(activacion($email, $codigo));


function activacion(string $email1, string $codigo1)
{
    $db = new Db();
    $conn = $db->getConn();
    $consulta = $conn->prepare("SELECT * FROM usuarios WHERE codigo_confirmacion = Binary ? AND email = Binary ?");
    $consulta->bind_param("ss", $codigo1, $email1);
    $result=$conn->query($consulta);
    if($result->num_rows>0) {
        $query = "UPDATE usuarios SET email_verificado = b'1' WHERE codigo = Binary ? and email = Binary ?" ;
        $query->bind_param("ss", $codigo1, $email1);
        $resultado = $query->execute();
        if ($resultado==true) { //Si se hizo el update
            $output = new SuccessResult("Verificación exitosa", true);
        } else { //No se hizo el update
            $err = new ErrorResult("Error de verificación", 401);
            $output = $err;
        }
    }else{
        $err = new ErrorResult("Ups, ha ocurrido un error, revise su correo e intente de nuevo", 401);
        $output = $err;
    }

    return $output;
}
?>
