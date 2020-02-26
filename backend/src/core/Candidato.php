<?php

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

    public static function updateEstatusCandidato($estatus, $id_usuario)
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
                $output = new SuccessResult("Candidato aceptado", true);
            }
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }
        $stmt->close();
        return $output;
    }

    public static function numeroUsuarios($estatus,$id_tipo_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT COUNT(id_usuario) from usuarios WHERE estatus =? AND id_tipo_usuario=?");
        $stmt->bind_param('si', $estatus,$id_tipo_usuario);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r);

        
    }
}
