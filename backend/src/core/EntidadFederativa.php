<?php

class Entidad{

    public static function get_entidadesFederativas(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT * FROM entidades_federativas WHERE estatus = 'A'");
        
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

}