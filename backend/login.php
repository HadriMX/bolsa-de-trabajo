<?php

error_reporting(E_ERROR | E_PARSE);

include "db_conn.php";
require_once "error.php";
require_once "success.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST');
header('content-type: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"));
$username = $post->email;
$pwd = $post->pwd;

echo json_encode(login($username, $pwd));


function login(string $username, string $pwd)
{
    $db = new Db();
    $conn = $db->getConn();

    // prepare and bind
    $stmt = $conn->prepare("SELECT * FROM usuarios_activos WHERE email = Binary ?");
    $stmt->bind_param("s", $username);
    
    $stmt->execute();

    $r = $db->readResult($stmt->get_result());

    if (empty($r)) {
        return new ErrorResult("El usuario no existe.", 404);
    }

    $usuario = $r[0];
    $hashedPwd = $usuario['pw'];

    if (!password_verify($pwd, $hashedPwd)) {
        return new ErrorResult("Contraseña incorrecta. Intente de nuevo, por favor.", 401);
    }

    $isEmailVerificado = boolval($usuario['email_verificado']);
    if (!$isEmailVerificado) {
        return new ErrorResult("No se puede iniciar sesión porque no se ha verificado la dirección email.", 4001);
    }

    $usuario['pw'] = null;  // limpiar contraseña antes de retornar
    return new SuccessResult("Login correcto", $usuario);
}

?>