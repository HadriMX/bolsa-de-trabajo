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
$username = strtoupper($username);

$tipoUsuario = $post->id_tipo_usuario;
if ($tipoUsuario == 1){
    $estatus="N";
}
else{
    $estatus="A";
}

//Crear el codigo de confirmacion
$codigo = com_create_guid();

$resultado_contraseña = validar_clave($pwd);

$pwd = password_hash($pwd,PASSWORD_BCRYPT);

echo json_encode(registro($username, $pwd, $codigo, $tipoUsuario, $estatus, $resultado_contraseña));

function registro(string $username1, string $pwd1, string $codigo_conf1, int $tipoUsuario1, string $estatus1, int $resultado_contraseña1)
{
    $db = new Db();
    $conn = $db->getConn();

    $resultado_email = validarEmailAddress($username1);
    
    if ($resultado_email==1){
        if ($resultado_contraseña1==6){
            $insertar = $conn->prepare("INSERT INTO usuarios (email, pw, codigo_confirmacion, id_tipo_usuario, estatus) VALUES  ( ?, ?, ?, ?, ?)");
            $insertar->bind_param("sssis", $username1, $pwd1, $codigo_conf1, $tipoUsuario1, $estatus1);
            $resultado = $insertar->execute();

            if ($resultado==true) { //Si se hizo la insersión
                //mandar correo
                $to      = $username;
                $subject = "Correo de Confirmacion";
                $message = 'Hola '.$username1."\r\n"." Sigue este vinculo para activar tu cuenta"."\r\n\r\n"." https://mipaginapersonalweb.000webhostapp.com/practica9/activacion.php?codigo=".$codigo_conf1."&email=".$username1."\r\n";
                $headers = 'De: (jonsonh45@gmail.com)' . "\r\n" .
                    'Dudas y/o sugerencias: (volar@gmail.com)' . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();
                mail($to, $subject, $message, $headers);

                $output = new SuccessResult("Registro correcto", true);
            
            } else { //No se hizo la insersión
                $query="select * from usuarios where email='".$username1."'";
                $result=$conn->query($query);
                if ($result->num_rows > 0) {
                    $err = new ErrorResult("El correo ingresado ya existe", 401);
                    $output = $err;    
                }
                else {
                    $err = new ErrorResult("Error de registro", 401);
                    $output = $err;
                }
            }
        }
        elseif($resultado_contraseña1==1){
            $err = new ErrorResult("La clave debe tener al menos 8 caracteres", 401);
            $output = $err;
        }
        elseif($resultado_contraseña1==2){
            $err = new ErrorResult("La clave no puede tener más de 20 caracteres", 401);
            $output = $err;
        }
        elseif($resultado_contraseña1==3){
            $err = new ErrorResult("La clave debe tener al menos una letra minúscula", 401);
            $output = $err;
        }
        else if($resultado_contraseña1==4){
            $err = new ErrorResult("La clave debe tener al menos una letra mayúscula", 401);
            $output = $err;
        }
        elseif($resultado_contraseña1==5){
            $err = new ErrorResult("La clave debe tener al menos un caracter numérico", 401);
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

function validar_clave($clave){
    //$error_clave="";
    $res=6;
    if(strlen($clave) < 8){
       //$error_clave = "La clave debe tener al menos 8 caracteres";
       $res=1;
       return $res;
    }
    if(strlen($clave) > 16){
       //$error_clave = "La clave no puede tener más de 16 caracteres";
       $res=2;
       return $res;
    }
    if (!preg_match('`[a-z]`',$clave)){
       //$error_clave = "La clave debe tener al menos una letra minúscula";
       $res=3;
       return $res;
    }
    if (!preg_match('`[A-Z]`',$clave)){
       //$error_clave = "La clave debe tener al menos una letra mayúscula";
       $res=4;
       return $res;
    }
    if (!preg_match('`[0-9]`',$clave)){
       //$error_clave = "La clave debe tener al menos un caracter numérico";
       $res=5;
       return $res;
    }
    return $res;
}
?>