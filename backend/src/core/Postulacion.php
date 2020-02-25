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

    public static function deletePostulacion($id_vacante, $id_candidato){
        $db = new Db();
        $conn = $db->getConn();
        $borrar = $conn->prepare("DELETE FROM postulados WHERE id_candidato = ? AND id_vacante = ?");
        $borrar->bind_param("ii",$id_candidato,$id_vacante);
        $resultado = $borrar->execute();
        if ($resultado==true) {
            return new SuccessResult("Tu postulación ha sido cancelada correctamente", true);
        }
        else {
            return new ErrorResult("Error de cancelación", 501);
        }
    }

    public static function getPostulaciones($estatus , $id_candidato){
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("SELECT * FROM postulaciones WHERE estatus = ? and id_candidato = ? ORDER BY fecha_postulacion DESC");
        $stmt->bind_param("si",$estatus, $id_candidato);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());

        return new SuccessResult("", $r);
    }

        
    public static function get_postulacionesPorVacante($id_vacante){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM bdt_bd.postulaciones_vacante WHERE id_vacante = ? ORDER BY estatus");
        $stmt->bind_param('i', $id_vacante);
        $stmt->execute();

        $r = $db->readResult($stmt->get_result());

        return new SuccessResult("",$r);
    }

    public static function actualizarEstatusPostulacion($id_candidato,$id_vacante,$estatus){
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("UPDATE postulados SET estatus = ? WHERE id_candidato = ? AND id_vacante = ?");
        $stmt->bind_param("sii",$estatus,$id_candidato,$id_vacante);
        $resultado = $stmt->execute();
        if ($resultado==true) {
            if($estatus == "A"){
                return new SuccessResult("El candidato ha sido aceptado correctamente", true);
            }
            return new SuccessResult("El candidato ha sido rechazado correctamente", true);
        }
        else {
            return new ErrorResult("Error de actualización. Intentelo más tarde", 501);
        }
    }

}