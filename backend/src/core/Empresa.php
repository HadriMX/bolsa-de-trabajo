<?php

class Empresa
{
    public static function update(array $empresa)
    {
        $bandera = 0; //bandera 0 = datos completos, 1 = datos incompletos
        $datosIncompletos = array(); //se guardarán los datos faltantes expecificamente
        $cadenaDatosIncompletos = "";
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("REPLACE INTO empresas(id_usuario, nombre_empresa, rfc, calle, colonia, cp, ciudad, id_entidad_federativa, id_municipio, id_tipo_empresa, telefono, descripcion, pagina_web, logo, nombre_persona_contacto, telefono_contacto, email_contacto, fecha_ultima_modificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

        //info personal
        $id_usuario = $empresa['id_usuario'];
        $nombre_empresa = trim($empresa['nombre_empresa']);
        $rfc = trim($empresa['rfc']);
        $id_tipo_empresa = $empresa['id_tipo_empresa'];
        $telefono = trim($empresa['telefono']);
        $pagina_web = trim($empresa['pagina_web']);
        $descripcion = trim($empresa['descripcion']);
        $logo = $empresa['logo'];

        //direccion
        $id_entidad_federativa = $empresa['id_entidad_federativa'];
        $id_municipio = $empresa['id_municipio'];
        $ciudad = trim($empresa['ciudad']);
        $colonia = trim($empresa['colonia']);
        $cp = $empresa['cp'];
        $calle = trim($empresa['calle']);

        //info contacto
        $nombre_persona_contacto = trim($empresa['nombre_persona_contacto']);
        $telefono_contacto = $empresa['telefono_contacto'];
        $email_contacto = trim($empresa['email_contacto']);
        $fecha_ultima_modificacion = $empresa['fecha_ultima_modificacion'];

        $stmt->bind_param(
            'issssssiiissssssss',
            $id_usuario,
            $nombre_empresa,
            $rfc,
            $calle,
            $colonia,
            $cp,
            $ciudad,
            $id_entidad_federativa,
            $id_municipio,
            $id_tipo_empresa,
            $telefono,
            $descripcion,
            $pagina_web,
            $logo,
            $nombre_persona_contacto,
            $telefono_contacto,
            $email_contacto,
            $fecha_ultima_modificacion
        );

        //validando
        if ($nombre_empresa == null || $nombre_empresa == "") {
            array_push($datosIncompletos, "Nombre de la empresa");
        }
        if ($rfc == null || $rfc == "") {
            array_push($datosIncompletos, "RFC");
        }
        if ($id_tipo_empresa == null || $id_tipo_empresa == "" || $id_tipo_empresa == 0) {
            array_push($datosIncompletos, "Tipo de empresa");
        }
        if ($telefono == null || $telefono == "") {
            array_push($datosIncompletos, "Telefono de la empresa");
        }
        if ($id_entidad_federativa == null || $id_entidad_federativa == 0) {
            array_push($datosIncompletos, "Entidad federativa");
        }
        if ($id_municipio == null || $id_municipio == 0) {
            array_push($datosIncompletos, "Municipio");
        }
        if ($ciudad == null || $ciudad == "") {
            array_push($datosIncompletos, "Ciudad");
        }
        if ($colonia == null || $colonia == "") {
            array_push($datosIncompletos, "Colonia/Localidad");
        }
        if ($cp == null || $cp == "") {
            array_push($datosIncompletos, "Codigo postal");
        }
        if ($calle == null || $calle == "") {
            array_push($datosIncompletos, "Calle");
        }
        if ($nombre_persona_contacto == null || $nombre_persona_contacto == "") {
            array_push($datosIncompletos, "Nombre de la persona contacto");
        }
        if ($telefono_contacto == null || $telefono_contacto == "") {
            array_push($datosIncompletos, "Telefono de la persona contacto");
        }
        if ($email_contacto == null || $email_contacto == "") {
            array_push($datosIncompletos, "Email persona contacto");
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
        }

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("La información ha sido guardada correctamente", true);
        } else {
            $output = new ErrorResult("Error: No se pudo guardar la información. Intentelo mas tarde", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function get_empresas($estatus)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT  * FROM  empresasvista where status=?");
        $stmt->bind_param('s', $estatus);
        $stmt->execute();


        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r);
    }

    public static function get_empresasInfoCompleta(int $id_usuario)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM bdt_bd.empresas WHERE id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();

        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r[0]);
    }

    public static function updateEstatusEmpresa($estatus,$id_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus=? where id_usuario = ?");
        $stmt->bind_param('si', $estatus, $id_usuario);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            if ($estatus == "A") {
                $output = new SuccessResult("La cuenta de la empresa ha sido activada nuevamente", true);
            } elseif ($estatus == "B") {
                $output = new SuccessResult("La cuenta de la empresa ha sido desactivada", true);
            }
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function registrar(array $empresa)
    {
        $bandera = 0; //bandera 0 = datos completos, 1 = datos incompletos
        $datosIncompletos = array(); //se guardarán los datos faltantes expecificamente
        $cadenaDatosIncompletos = "";
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("INSERT INTO empresas(id_usuario, nombre_empresa, rfc, calle, colonia, cp, ciudad, id_entidad_federativa, id_municipio, id_tipo_empresa, telefono, descripcion, pagina_web, logo, nombre_persona_contacto, telefono_contacto, email_contacto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

        //info personal
        $id_usuario = $empresa['id_usuario'];
        $nombre_empresa = trim($empresa['nombre_empresa']);
        $rfc = trim($empresa['rfc']);
        $id_tipo_empresa = $empresa['id_tipo_empresa'];
        $telefono = trim($empresa['telefono']);
        $pagina_web = trim($empresa['pagina_web']);
        $descripcion = trim($empresa['descripcion']);
        $logo = $empresa['logo'];

        //direccion
        $id_entidad_federativa = $empresa['id_entidad_federativa'];
        $id_municipio = $empresa['id_municipio'];
        $ciudad = trim($empresa['ciudad']);
        $colonia = trim($empresa['colonia']);
        $cp = $empresa['cp'];
        $calle = trim($empresa['calle']);

        //info contacto
        $nombre_persona_contacto = trim($empresa['nombre_persona_contacto']);
        $telefono_contacto = $empresa['telefono_contacto'];
        $email_contacto = trim($empresa['email_contacto']);

        $stmt->bind_param(
            'issssssiiisssssss',
            $id_usuario,
            $nombre_empresa,
            $rfc,
            $calle,
            $colonia,
            $cp,
            $ciudad,
            $id_entidad_federativa,
            $id_municipio,
            $id_tipo_empresa,
            $telefono,
            $descripcion,
            $pagina_web,
            $logo,
            $nombre_persona_contacto,
            $telefono_contacto,
            $email_contacto
        );

        //validando
        if ($nombre_empresa == null || $nombre_empresa == "") {
            array_push($datosIncompletos, "Nombre de la empresa");
        }
        if ($rfc == null || $rfc == "") {
            array_push($datosIncompletos, "RFC");
        }
        if ($id_tipo_empresa == null || $id_tipo_empresa == "" || $id_tipo_empresa == 0) {
            array_push($datosIncompletos, "Tipo de empresa");
        }
        if ($telefono == null || $telefono == "") {
            array_push($datosIncompletos, "Telefono de la empresa");
        }
        if ($id_entidad_federativa == null || $id_entidad_federativa == 0) {
            array_push($datosIncompletos, "Entidad federativa");
        }
        if ($id_municipio == null || $id_municipio == 0) {
            array_push($datosIncompletos, "Municipio");
        }
        if ($ciudad == null || $ciudad == "") {
            array_push($datosIncompletos, "Ciudad");
        }
        if ($colonia == null || $colonia == "") {
            array_push($datosIncompletos, "Colonia/Localidad");
        }
        if ($cp == null || $cp == "") {
            array_push($datosIncompletos, "Codigo postal");
        }
        if ($calle == null || $calle == "") {
            array_push($datosIncompletos, "Calle");
        }
        if ($nombre_persona_contacto == null || $nombre_persona_contacto == "") {
            array_push($datosIncompletos, "Nombre de la persona contacto");
        }
        if ($telefono_contacto == null || $telefono_contacto == "") {
            array_push($datosIncompletos, "Telefono de la persona contacto");
        }
        if ($email_contacto == null || $email_contacto == "") {
            array_push($datosIncompletos, "Email persona contacto");
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
        }

        $stmt->execute();

        $stmt2 = $conn->prepare("UPDATE usuarios SET estatus = 'A' where id_usuario = ?");
        $stmt2->bind_param('i', $id_usuario);
        $stmt2->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Has completado el registro correctamente.", true);
        } else {
            $output = new ErrorResult("Error: No se pudo guardar la información. Intentelo más tarde.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function get_emails($id_usuario,$id_empresa){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT email as 'email', email_contacto 'email_contacto'FROM usuarios, empresas WHERE usuarios.id_usuario=? AND empresas.id_usuario=?");
        $stmt->bind_param('ii', $id_usuario,$id_empresa);
        $stmt->execute();

        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r[0]);
     
    }
}
