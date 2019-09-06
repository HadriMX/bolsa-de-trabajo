//registro.php
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
//variables
$username = $post->email;
$pwd = $post->password;

$tipoUsuario = $post->id_tipo_usuario;
if ($tipoUsuario == 1){
    $estatus="N";
}
else{
    $estatus="A";
}

//Crear el codigo de confirmacion
$codigo = com_create_guid();

$pwd = hash($pwd);

echo json_encode(registro($username, $pwd, $codigo, $tipoUsuario, $estatus));

function registro(string $username1, string $pwd1, string $codigo_conf1, int $tipoUsuario1, string $estatus1)
{
    $db = new Db();
    $conn = $db->getConn();

    $insertar = $conn->prepare("INSERT INTO usuarios (email, pw, codigo_confirmacion, id_tipo_usuario, estatus) VALUES  ( ?, ?, ?, ?, ?)");
    $insertar->bind_param("sssis", $username1, $pwd1, $codigo_conf1, $tipoUsuario1, $estatus1);
    
    $insertar->execute();

    $r = $db->readResult($insertar->get_result());

    if (empty($r)) {
        $err = new ErrorResult("Error de registro", 401);
        $output = $err;
    } else {
        $output = new SuccessResult("Registro correcto", true);
        $output = $output;
    }

    return $output;
}
?>