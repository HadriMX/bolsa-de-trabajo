<?php

class Ciudad{

    public static function get_ciudades($id_entidad,$id_municipio){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT * FROM ciudades WHERE id_entidad_federativa = ? AND id_municipio = ? AND estatus = 'A'");
        $stmt->bind_param("ii",$id_entidad,$id_municipio);

        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

}