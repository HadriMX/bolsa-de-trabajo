<?php

class Candidato {
    public static function numeroUsuarios($estatus,$id_tipo_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT COUNT(id_usuario) from usuarios WHERE estatus =? AND id_tipo_usuario=?");
        $stmt->bind_param('si', $estatus,$id_tipo_usuario);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r);
    }

    public static function numeroSolicitudes(){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT (COUNT(id_usuario)) as total from solicitudes");
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r);
    }

    public static function numoeroVacantes(){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare(" SELECT (COUNT(id_vacante)) as total from vacantes where estatus ='A'");
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r);
    }

}