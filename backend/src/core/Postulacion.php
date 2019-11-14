<?php

class Postulacion {

    public static function addPostulacion($id_vacante, $id_candidato, $fecha){
        $db = new Db();
        $conn = $db->getConn();
        $insertar = $conn->prepare("INSERT INTO postulados (id_candidato, id_vacante, fecha, estatus)VALUES (?,?,?,'P')");
        $insertar->bind_param("iis",$id_candidato,$id_vacante,$fecha);
        $resultado = $insertar->execute();
        if ($resultado==true) {
            return new SuccessResult("Has sido postulado correctamente", true);
        }
        else {
            return new ErrorResult("Error de postulación", 501);
        }
    }

    public static function getPostulaciones($estatus , $id_candidato){
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("SELECT * FROM postulaciones WHERE estatus = ? and id_candidato = ? ORDER BY fecha_postulacion");
        $stmt->bind_param("si",$estatus, $id_candidato);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());

        return new SuccessResult("", $r);
    }

}