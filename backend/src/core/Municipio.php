<?php

class Municipio{

    public static function get_municipios($id_entidad){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT * FROM municipios WHERE id_entidad_federativa = ? AND estatus = 'A'");
        $stmt->bind_param("i",$id_entidad);

        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

}