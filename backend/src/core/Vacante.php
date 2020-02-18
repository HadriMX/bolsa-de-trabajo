<?php

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

        $stmt->bind_param("sisssidssi",
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
        $stmt->bind_param("is", $id_empresa,$estatus);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());

        return new SuccessResult("", $r);
    }

    public static function comprobarPertenenciaVacante($id_empresa, $id_vacante){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM bdt_bd.vacantesvista WHERE id_vacante = ? AND id_empresa = ?");
        $stmt->bind_param('ii', $id_vacante, $id_empresa);
        $stmt->execute();
        
        $r = $db->readResult($stmt->get_result());
        if (empty($r)) {
            return new ErrorResult("Acceso denegado", 404);
        }
        
        return new SuccessResult("",$r[0]);
    }


}
