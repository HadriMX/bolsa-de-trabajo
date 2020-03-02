<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'mailer/Exception.php';
require 'mailer/PHPMailer.php';
require 'mailer/SMTP.php';

class Vacante
{
    public static function insert(array $vacante)
    {
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("INSERT INTO vacantes(titulo_vacante, id_usuario, puesto, descripcion_puesto, descripcion_puesto_plain_text, id_area_estudio, sueldo, genero, direccion, id_entidad_federativa) VALUES (?,?,?,?,?,?,?,?,?,?)");

        $titulo_vacante = $vacante['titulo_vacante'];
        $id_usuario = $vacante['id_usuario'];
        $puesto = $vacante['puesto'];
        $descripcion_puesto = $vacante['descripcion_puesto'];
        $descripcion_puesto_plain_text = $vacante['descripcion_puesto_plain_text'];
        $id_area_estudio = $vacante['id_area_estudio'];
        $sueldo = $vacante['sueldo'];
        $genero = $vacante['genero'];
        $direccion = $vacante['direccion'];
        $id_entidad_federativa = $vacante['id_entidad_federativa'];

        $stmt->bind_param(
            "sisssidssi",
            $titulo_vacante,
            $id_usuario,
            $puesto,
            $descripcion_puesto,
            $descripcion_puesto_plain_text,
            $id_area_estudio,
            $sueldo,
            $genero,
            $direccion,
            $id_entidad_federativa
        );

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Vacante registrada correctamente", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function get_mis_vacantes($estatus)
    {
        $db = new Db();
        $conn = $db->getConn();

        $id_empresa = $_SESSION['currentUser']['id_usuario'];

        $stmt = $conn->prepare("SELECT * FROM vacantesvista WHERE id_empresa = ? AND estatus = ?");
        $stmt->bind_param("is", $id_empresa, $estatus);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());

        return new SuccessResult("", $r);
    }

    public static function comprobarPertenenciaVacante($id_empresa, $id_vacante)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM bdt_bd.vacantesvista WHERE id_vacante = ? AND id_empresa = ?");
        $stmt->bind_param('ii', $id_vacante, $id_empresa);
        $stmt->execute();

        $r = $db->readResult($stmt->get_result());
        if (empty($r)) {
            return new ErrorResult("Acceso denegado", 404);
        }

        return new SuccessResult("", $r[0]);
    }

    public static function cerrarVacante($id_empresa, $id_vacante)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE vacantes SET estatus='B' WHERE id_vacante = ? AND id_usuario = ?");
        $stmt->bind_param('ii', $id_vacante, $id_empresa);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("La vacante ha sido cerrada. Se les avisará a los candidatos que se hayan postulado en esta vacante via email", true);
        } else {
            $output = new ErrorResult("Hubo un error al cerrar la vacante. Intentelo más tarde", 515);
        }
        $stmt->close();
        return $output;
    }

    public static function abrirVacante($id_empresa, $id_vacante)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE vacantes SET estatus='A' WHERE id_vacante = ? AND id_usuario = ?");
        $stmt->bind_param('ii', $id_vacante, $id_empresa);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("La vacante ha sido reabierta correctamente", true);
        } else {
            $output = new ErrorResult("Hubo un error al abrir la vacante. Intentelo más tarde", 515);
        }
        $stmt->close();
        return $output;
    }

    public static function updateEstatusVacante($id_vacante,$email1,$email2,$motivo)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE vacantes SET estatus='B' WHERE id_vacante = ?");
        $stmt->bind_param('i', $id_vacante);
        $stmt->execute();
        $motivo=$motivo;

        if ($stmt->affected_rows > 0) {
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
                $mail->addAddress($email1);     // Add a recipient
                $mail->addAddress($email2);     // Add a recipient

                // Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->CharSet = 'utf-8';
                $mail->Subject = 'Actualización del estatus de su vacante';
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
                                      <h1>El estatus de su vacante ha cambiado por el siguiente motivo:</h1>
                                      <h2>'. $motivo .'</h2>
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
            $output = new SuccessResult("La vacante ha sido eliminada correctamente, se le notificará a la empresa el motivo via email", true);
        } else {
            $output = new ErrorResult("Hubo un error al eliminar la vacante. Intentelo más tarde", 515);
        }
        $stmt->close();
        return $output;
    }
}
