<?php

class Auth
{
    public static function login(string $username, string $pwd)
    {
        $db = new Db();
        $conn = $db->getConn();

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

        if ($usuario['estatus'] == 'N') {
            return new ErrorResult("El usuario no está autorizado aún. Debes esperar a que un administrador autorice tu solicitud de registro.", 4011);
        }

        $isEmailVerificado = boolval($usuario['email_verificado']);
        if (!$isEmailVerificado) {
            return new ErrorResult("No se puede iniciar sesión porque no se ha verificado la dirección email.", 4001);
        }
        
        $usuario['pw'] = null;  // limpiar antes de retornar

        return new SuccessResult("Login correcto", $usuario);
    }
}
