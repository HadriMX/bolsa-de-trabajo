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

$pwd = password_hash($pwd,PASSWORD_BCRYPT);

echo json_encode(registro($username, $pwd, $codigo, $tipoUsuario, $estatus));

function registro(string $username1, string $pwd1, string $codigo_conf1, int $tipoUsuario1, string $estatus1)
{
    $db = new Db();
    $conn = $db->getConn();

    $resultado_email = validarEmailAddress($username1);
    
    if ($resultado_email==1){
        $insertar = $conn->prepare("INSERT INTO usuarios (email, pw, codigo_confirmacion, id_tipo_usuario, estatus) VALUES  ( ?, ?, ?, ?, ?)");
        $insertar->bind_param("sssis", $username1, $pwd1, $codigo_conf1, $tipoUsuario1, $estatus1);
        $resultado = $insertar->execute();

        if ($resultado==true) { //Si se hizo la insersión
            //mandar correo
            $to      = $username;
            $subject = "Correo de Confirmacion";
            $message = 'Hola '.$username1."\r\n"." Sigue este vinculo para activar tu cuenta"."\r\n\r\n"." https://192.168.56.1/practica9/activacion.php?codigo=".$codigo_conf1."&email=".$username1."\r\n";
            $headers = 'De: (jonsonh45@gmail.com)' . "\r\n" .
                'Dudas y/o sugerencias: (volar@gmail.com)' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
            mail($to, $subject, $message, $headers);

            $output = new SuccessResult("Registro correcto", true);
            
        } else { //No se hizo la insersión
            $err = new ErrorResult("Error de registro", 401);
            $output = $err;
        }
    }
    else{
        $err = new ErrorResult("Email invalido", 401);
        $output = $err;
    }

    return $output;
}

function validarEmailAddress($email)
{
   // Regresa 1 si la cadena hace match

   // Regresa 0 si no hace match

   // Regresa FALSE si hubo un error 

   return preg_match("/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})+$/", $email);
}
?>