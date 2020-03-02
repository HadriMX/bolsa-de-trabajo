<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'mailer/Exception.php';
require 'mailer/PHPMailer.php';
require 'mailer/SMTP.php';

class Auth
{
    public static function login(string $username, string $pwd)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM usuarios_activos WHERE email = ?");
        $stmt->bind_param("s", $username);

        $stmt->execute();

        $r = $db->readResult($stmt->get_result());

        if (empty($r)) {
            return new ErrorResult("El usuario no existe.", 404);
        }

        $usuario = $r[0];

        if ($usuario['id_tipo_usuario'] != 0 && $usuario['id_tipo_usuario'] != 100) {
            if ($usuario['id_tipo_usuario'] == 1) {
                $stmt = $conn->prepare("SELECT * FROM usuarios_candidatos WHERE id_usuario = ?");
            } elseif ($usuario['id_tipo_usuario']) {
                $stmt = $conn->prepare("SELECT * FROM usuarios_empresas WHERE id_usuario = ?");
            }

            $stmt->bind_param("i", $usuario['id_usuario']);
            $stmt->execute();
            $r = $db->readResult($stmt->get_result());
            $usuario = $r[0];
        }

        $hashedPwd = $usuario['pw'];
        if (!password_verify($pwd, $hashedPwd)) {
            return new ErrorResult("Contraseña incorrecta. Intente de nuevo, por favor.", 401);
        }

        $isEmailVerificado = boolval($usuario['email_verificado']);
        if (!$isEmailVerificado) {
            return new ErrorResult("No se puede iniciar sesión porque no se ha verificado la dirección email.", 4001);
        }

        if ($usuario['estatus'] == 'N') {
            return new ErrorResult("No se puede iniciar sesión porque no has completado tu registro.", 4031);
        }

        if ($usuario['estatus'] == 'P') {
            return new ErrorResult("No se puede iniciar sesión porque aún no has sido autorizado. Debes esperar a que un administrador autorice tu solicitud de registro.", 4032);
        }

        // limpiar antes de retornar
        $usuario['pw'] = null;
        $usuario['codigo_confirmacion'] = null;

        return new SuccessResult("Login correcto", $usuario);
    }

    public static function reload_current_user(string $username)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM usuarios_activos WHERE email = ?");
        $stmt->bind_param("s", $username);

        $stmt->execute();

        $r = $db->readResult($stmt->get_result());

        if (empty($r)) {
            return new ErrorResult("El usuario no existe.", 404);
        }

        $usuario = $r[0];

        if ($usuario['id_tipo_usuario'] != 0 && $usuario['id_tipo_usuario'] != 100) {
            if ($usuario['id_tipo_usuario'] == 1) {
                $stmt = $conn->prepare("SELECT * FROM usuarios_candidatos WHERE id_usuario = ?");
            } elseif ($usuario['id_tipo_usuario']) {
                $stmt = $conn->prepare("SELECT * FROM usuarios_empresas WHERE id_usuario = ?");
            }

            $stmt->bind_param("i", $usuario['id_usuario']);
            $stmt->execute();
            $r = $db->readResult($stmt->get_result());
            $usuario = $r[0];
        }

        // limpiar antes de retornar
        $usuario['pw'] = null;
        $usuario['codigo_confirmacion'] = null;

        return new SuccessResult("", $usuario);
    }

    public static function register(array $usuario)
    {
        if (self::validate_email($usuario['email']) !== 1) {
            return new ErrorResult("La dirección de correo electrónico no es válida.", 400);
        }

        if (self::validate_password($usuario['password']) !== 1) {
            return new ErrorResult("La contraseña debe contener al menos una letra, un número y un caracter especial (@$!%*#?&). Mínimo 8 caracteres.", 400);
        }

        $email = mb_strtolower($usuario['email'], 'UTF-8');
        $pwdHash = password_hash($usuario['password'], PASSWORD_BCRYPT);
        $codigoConfirmacion = md5(random_bytes(32));
        $idTipoUsuario = $usuario['id_tipo_usuario'];

        if ($usuario['id_tipo_usuario'] == 1) { // candidato
            $estatus = "N";
        } elseif ($usuario['id_tipo_usuario'] == 2) {   // empresa
            $estatus = "N";
        } elseif ($usuario['id_tipo_usuario'] == 0) {   // administrador
            $estatus = "A";
        } elseif ($usuario['id_tipo_usuario'] == 100) { // administrador auxiliar
            $estatus = "A";
        }
        /*
        la razón por la que no hay una cláusula 'else' es para mantener separados
        los tipos y si se necesitan más a futuro para que se tengan que agregar explícitamente
        para evitar bugs
        */

        $db = new Db();
        $conn = $db->getConn();

        $insertar = $conn->prepare("INSERT INTO usuarios (email, pw, codigo_confirmacion, id_tipo_usuario, estatus) VALUES (?, ?, ?, ?, ?)");
        $insertar->bind_param("sssis", $email, $pwdHash, $codigoConfirmacion, $idTipoUsuario, $estatus);
        $resultado = $insertar->execute();

        if ($resultado === true) { //Si se hizo la insersión
            //mandar correo

            $host = 'http://localhost:4200';
            $urlVerificacion = $host . '/registro/' . $codigoConfirmacion;

            $mail = new PHPMailer(true);

            try {
                //Server settings
                $mail->isSMTP();                                            // Send using SMTP
                $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                $mail->Username   = 'volar.noreply@gmail.com';                     // SMTP username
                $mail->Password   = 'Volar12345$';                               // SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
                $mail->Port       = 587;                                    // TCP port to connect to

                //Recipients
                $mail->setFrom('volar.noreply@gmail.com', 'Remitente');
                $mail->addAddress($email);     // Add a recipient

                // Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->CharSet = 'utf-8';
                $mail->Subject = 'Confirmación de correo electrónico';
                $mail->Body    = '<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Verifica tu dirección de correo electrónico</title>
    <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */
        *:not(br):not(tr):not(html) {
            font-family: Arial, Helvetica, sans-serif;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            line-height: 1.4;
            background-color: #F5F7F9;
            color: #839197;
            -webkit-text-size-adjust: none;
        }

        a {
            color: #414EF9;
        }

        /* Layout ------------------------------ */
        .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #F5F7F9;
        }

        .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
        }

        /* Masthead ----------------------- */
        .email-masthead {
            padding: 25px 0;
            text-align: center;
        }

        .email-masthead_logo {
            max-width: 400px;
            border: 0;
        }

        .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #839197;
            text-decoration: none;
            text-shadow: 0 1px 0 white;
        }

        /* Body ------------------------------ */
        .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            border-top: 1px solid #E7EAEC;
            border-bottom: 1px solid #E7EAEC;
            background-color: #FFFFFF;
        }

        .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
        }

        .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            text-align: center;
        }

        .email-footer p {
            color: #839197;
        }

        .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            text-align: center;
        }

        .body-sub {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #E7EAEC;
        }

        .content-cell {
            padding: 35px;
        }

        .align-right {
            text-align: right;
        }

        /* Type ------------------------------ */
        h1 {
            margin-top: 0;
            color: #292E31;
            font-size: 19px;
            font-weight: bold;
            text-align: left;
        }

        h2 {
            margin-top: 0;
            color: #292E31;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
        }

        h3 {
            margin-top: 0;
            color: #292E31;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
        }

        p {
            margin-top: 0;
            color: #839197;
            font-size: 16px;
            line-height: 1.5em;
            text-align: left;
        }

        p.sub {
            font-size: 12px;
        }

        p.center {
            text-align: center;
        }

        /* Buttons ------------------------------ */
        .button {
            display: inline-block;
            width: 200px;
            background-color: #414EF9;
            border-radius: 3px;
            color: #ffffff;
            font-size: 15px;
            line-height: 45px;
            text-align: center;
            text-decoration: none;
            -webkit-text-size-adjust: none;
            mso-hide: all;
        }

        .button--green {
            background-color: #28DB67;
        }

        .button--red {
            background-color: #FF3665;
        }

        .button--blue {
            background-color: #414EF9;
        }

        /*Media Queries ------------------------------ */
        @media only screen and (max-width: 600px) {

            .email-body_inner,
            .email-footer {
                width: 100% !important;
            }
        }

        @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }
    </style>
</head>

<body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                    <!-- Logo -->
                    <tr>
                        <td class="email-masthead">
                            <a class="email-masthead_name">Logo Volar</a>
                        </td>
                    </tr>
                    <!-- Email Body -->
                    <tr>
                        <td class="email-body" width="100%">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                                <!-- Body content -->
                                <tr>
                                    <td class="content-cell">
                                        <h1>Verifica tu dirección de correo electrónico</h1>
                                        <p>Tu cuenta ya está casi lista. Haz clic en el botón para verificar tu correo.
                                        </p>
                                        <!-- Action -->
                                        <table class="body-action" align="center" width="100%" cellpadding="0"
                                            cellspacing="0">
                                            <tr>
                                                <td align="center">
                                                    <div>
                                                        <a href="' . $urlVerificacion . '" class="button button--blue">
                                                            Verificar email
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- Sub copy -->
                                        <table class="body-sub">
                                            <tr>
                                                <td>
                                                    <p class="sub">Si el botón no funciona, puedes copiar y pegar la siguiente URL en tu navegador.
                                                    </p>
                                                    <p class="sub"><a href="' . $urlVerificacion . '">' . $urlVerificacion . '</a></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="content-cell">
                                        <p class="sub center">
                                            Calle Río Sinaloa #245 Pte, Interior B. Fracc. Sacally.
                                            <br>Los Mochis, sinaloa. México/ C.P. 81240
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>';
                $mail->AltBody = $urlVerificacion;

                $mail->send();
            } catch (Exception $e) {
                $output = new ErrorResult("Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 0);
            }

            $output = new SuccessResult("Registro correcto", true);
        } else {
            $output = new ErrorResult("El usuario ya está registrado.", 0);
        }

        return $output;
    }

    public static function validate_password(string $password)
    {
        // al menos una letra, un número y un caracter especial (@$!%*#?&). Mínimo 8 caracteres
        $re = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/m";
        $valid = preg_match($re, $password);
        return $valid;
    }

    public static function validate_email(string $email)
    {
        $re = "/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})+$/";
        $valid = preg_match($re, $email);
        return $valid;
    }

    public static function verify_email(string $codigo)
    {
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("SELECT email_verificado, codigo_confirmacion FROM usuarios_activos WHERE codigo_confirmacion = ? LIMIT 1");

        $stmt->bind_param('s', $codigo);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        $stmt->close();

        if (empty($r)) {
            return new ErrorResult("No se encontró ninguna cuenta asociada a este código de verificación.", 404);
        }

        if ($r[0]['email_verificado'] == 1) {
            return new ErrorResult("Esta dirección email ya está verificada.", 4000);
        }

        $conn = $db->getConn();
        $stmt = $conn->prepare("UPDATE usuarios SET email_verificado = 1 WHERE codigo_confirmacion = ?");

        $stmt->bind_param('s', $codigo);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Dirección email confirmada correctamente.", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function getUserFromVerificationCode(string $codigoConfirmacion)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM usuarios_activos WHERE codigo_confirmacion = ?");
        $stmt->bind_param("s", $codigoConfirmacion);

        $stmt->execute();

        $r = $db->readResult($stmt->get_result());

        if (empty($r)) {
            return new ErrorResult("No hay ningún usuario asociado a este código de confirmación.", 404);
        }

        $usuario = $r[0];

        if ($usuario['estatus'] != 'N') {
            return new ErrorResult("Ya se completó el registro de este usuario.", 4031);
        }

        // limpiar antes de retornar
        $usuario['pw'] = null;

        return new SuccessResult("OK", $usuario);
    }
}
