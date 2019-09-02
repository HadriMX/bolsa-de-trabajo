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
$username = $post->email;
$pwd = $post->pwd;

echo json_encode(login($username, $pwd));


function login(string $username, string $pwd)
{
    $db = new Db();
    $conn = $db->getConn();

    // prepare and bind
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = Binary ? AND pw = Binary ?");
    $stmt->bind_param("ss", $username, $pwd);
    
    $stmt->execute();

    $r = $db->readResult($stmt->get_result());

    if (empty($r)) {
        $err = new ErrorResult("Usuario y/o contrasenia incorrecto.", 401);
        $output = $err;
    } else {
        $output = new SuccessResult("Login correcto", true);
        $output = $output;
    }

    return $output;
}

?>