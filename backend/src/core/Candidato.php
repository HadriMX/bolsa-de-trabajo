<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'mailer/Exception.php';
require 'mailer/PHPMailer.php';
require 'mailer/SMTP.php';
class Candidato
{
    public static function update(array $candidato)
    {
        $msj = "Tu información ha sido guardada correctamente.";
        $datosIncompletos = array(); //se guardarán los datos faltantes expecificamente
        $cadenaDatosIncompletos = "";
        $db = new Db();
        $conn = $db->getConn();

        if (is_a($conn, 'ErrorResult')) {
            return $conn;
        }

        $stmt = $conn->prepare("UPDATE candidatos SET telefono = ?, id_municipio = ?, ciudad = ?, colonia = ?, cp = ?, calle = ?, num_ext = ?, id_area_estudio = ?, escuela = ?, ruta_curp = ?, ruta_id = ?, ruta_cv = ? WHERE id_usuario = ?");

        //info personal
        $id_usuario = $candidato['id_usuario'];
        $telefono = trim($candidato['telefono']);

        //direccion
        $id_municipio = $candidato['id_municipio'];
        $ciudad = trim($candidato['ciudad']);
        $colonia = trim($candidato['colonia']);
        $cp = $candidato['cp'];
        $calle = trim($candidato['calle']);
        $num_ext = $candidato['num_ext'];

        //info academica
        $id_area_estudio = $candidato['id_area_estudio'];
        $escuela = trim($candidato['escuela']);
        $ruta_curp = $candidato['ruta_curp'];
        $ruta_id = $candidato['ruta_id'];
        $ruta_cv = $candidato['ruta_cv'];

        $stmt->bind_param(
            'sisssssissssi',
            $telefono,
            $id_municipio,
            $ciudad,
            $colonia,
            $cp,
            $calle,
            $num_ext,
            $id_area_estudio,
            $escuela,
            $ruta_curp,
            $ruta_id,
            $ruta_cv,
            $id_usuario
        );


        if ($telefono == null || $telefono == "") {
            array_push($datosIncompletos, "Telefono");
        }
        if ($id_municipio == null || $id_municipio == "" || $id_municipio == 0) {
            array_push($datosIncompletos, "Municipio");
        }
        if ($ciudad == null || $ciudad == "") {
            array_push($datosIncompletos, "Ciudad/Localidad");
        }
        if ($colonia == null || $colonia == "") {
            array_push($datosIncompletos, "Colonia");
        }
        if ($cp == null || $cp == "") {
            array_push($datosIncompletos, "Codigo postal");
        }
        if ($calle == null || $calle == "") {
            array_push($datosIncompletos, "Calle");
        }
        if ($num_ext == null || $num_ext == "") {
            array_push($datosIncompletos, "Numero exterior");
        }
        if ($id_area_estudio == null || $id_area_estudio == "") {
            array_push($datosIncompletos, "Area de estudio");
        }
        if ($escuela == null || $escuela == "") {
            array_push($datosIncompletos, "Escuela");
        }

        if (count($datosIncompletos) >= 1) {

            for ($i = 0; $i < count($datosIncompletos); $i++) {
                $cadenaDatosIncompletos = $cadenaDatosIncompletos . $datosIncompletos[$i];
                if ($i == count($datosIncompletos) - 1) {
                    $cadenaDatosIncompletos = $cadenaDatosIncompletos . ".";
                } else {
                    $cadenaDatosIncompletos = $cadenaDatosIncompletos . ", ";
                }
            }

            return new ErrorResult("Error: Datos incompletos. Porfavor llene todos los datos: " . $cadenaDatosIncompletos, 415);
        } else {

            if ($_SESSION["currentUser"]["estatus"] == "I") {
                $stmt2 = $conn->prepare("UPDATE usuarios SET estatus='A' where id_usuario = ?");
                $stmt2->bind_param('i', $id_usuario);
                $stmt2->execute();

                $msj = "Tu información ha sido guardada correctamente. Vuelve a iniciar sesión para que se apliquen los cambios.";
            }
        }

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult($msj, true);
        } else {
            $output = new SuccessResult("No hubo cambios.", 1);
        }

        $stmt->close();

        return $output;
    }

    public static function get_candidatos($estatus)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM candidatosvista where estatus=?");
        $stmt->bind_param('s', $estatus);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r);
    }

    public static function get_candidatosInfoCompleta(int $id_usuario)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM bdt_bd.candidatos WHERE id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        $candidato = $r[0];
        return new SuccessResult("", $candidato);
    }

    public static function updateEstatusCandidato($estatus, $id_usuario, $email)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus=? WHERE id_usuario = ?");
        $stmt->bind_param('si', $estatus, $id_usuario);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            if ($estatus == "R") {
                $output = new SuccessResult("Candidato rechazado", true);
            } elseif ($estatus == "B") {
                $output = new SuccessResult("La cuenta del candidato ha sido desactivada", true);
            } elseif ($estatus == "A") {
                $output = new SuccessResult("La cuenta del candidato ha sido activada nuevamente", true);
            } elseif ($estatus == "I") {
                  //mandar correo

            $host = 'http://localhost:4200';


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
                $mail->Subject = 'Actualización del estatus de su cuenta';
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
                                      <h1>Tu cuenta ha sido aceptada en bolsa de trabajo</h1>
                                      <h2>Ahora tienes acceso al sitio<h2>
                                      <!-- Action -->
                                      <table class="body-action" align="center" width="100%" cellpadding="0"
                                          cellspacing="0">
                                          <tr>
                                              <td align="center">
                                                  <div>
                                                      
                                                  </div>
                                              </td>
                                          </tr>
                                      </table>
                                      <!-- Sub copy -->
                                      <table class="body-sub">
                                          <tr>
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


                $mail->send();
            } catch (Exception $e) {
                $output = new ErrorResult("Message could not be sent. Mailer Error: {$mail->ErrorInfo}", 0);
            }
                $output = new SuccessResult("Candidato aceptado", true);

            }
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }
        $stmt->close();
        return $output;
    }

    public static function registrar(array $candidato, int $idUsuario)
    {
        $datosIncompletos = array(); //se guardarán los datos faltantes expecificamente
        $cadenaDatosIncompletos = "";

        $nombre = trim($candidato['nombre']);
        $apellido1 = trim($candidato['apellido1']);
        $apellido2 = trim($candidato['apellido2']);
        $fecha_nacimiento = trim($candidato['fecha_nacimiento']);
        $genero = $candidato['genero'];
        $telefono = trim($candidato['telefono']);
        $id_entidad_federativa = $candidato['id_entidad_federativa'];
        $id_grado_estudios = $candidato['id_grado_estudios'];
        $ruta_cv = $candidato['ruta_cv'];

        if (empty($nombre)) {
            array_push($datosIncompletos, "Nombre");
        }
        if (empty($apellido1)) {
            array_push($datosIncompletos, "Primer apellido");
        }
        if (empty($fecha_nacimiento)) {
            array_push($datosIncompletos, "Fecha de nacimiento");
        }
        if (empty($genero)) {
            array_push($datosIncompletos, "Género");
        }
        if (empty($telefono)) {
            array_push($datosIncompletos, "Teléfono");
        }
        if (empty($id_entidad_federativa)) {
            array_push($datosIncompletos, "Entidad federativa");
        }
        if (empty($id_grado_estudios)) {
            array_push($datosIncompletos, "Último nivel de estudios");
        }
        if (empty($ruta_cv)) {
            array_push($datosIncompletos, "Curriculum");
        }

        if (count($datosIncompletos) >= 1) {
            for ($i = 0; $i < count($datosIncompletos); $i++) {
                $cadenaDatosIncompletos = $cadenaDatosIncompletos . $datosIncompletos[$i];
                if ($i == count($datosIncompletos) - 1) {
                    $cadenaDatosIncompletos = $cadenaDatosIncompletos . ".";
                } else {
                    $cadenaDatosIncompletos = $cadenaDatosIncompletos . ", ";
                }
            }

            return new ErrorResult("Error: Datos incompletos. Por favor, llene todos los datos: " . $cadenaDatosIncompletos, 415);
        }

        $db = new Db();
        $conn = $db->getConn();

        if (is_a($conn, 'ErrorResult')) {
            return $conn;
        }

        $stmt = $conn->prepare("INSERT INTO candidatos (id_usuario, nombre, apellido1, apellido2, fecha_nacimiento, genero, telefono, id_entidad_federativa, id_grado_estudios, ruta_cv) VALUES (?, ?,?,?,?,?,?,?,?,?)");

        $stmt->bind_param(
            'issssssiis',
            $idUsuario,
            $nombre,
            $apellido1,
            $apellido2,
            $fecha_nacimiento,
            $genero,
            $telefono,
            $id_entidad_federativa,
            $id_grado_estudios,
            $ruta_cv
        );

        $stmt->execute();

        $stmt2 = $conn->prepare("UPDATE usuarios SET estatus = 'P' where id_usuario = ?");
        $stmt2->bind_param('i', $idUsuario);
        $stmt2->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Has completado el registro correctamente. El siguiente paso es esperar la autorización de tu registro por parte de un administrador.", true);
        } else {
            $output = new ErrorResult("Ocurrió un error inesperado. Inténtalo más tarde.", 555);
        }

        $stmt->close();
        $stmt2->close();

        return $output;
    }

}
