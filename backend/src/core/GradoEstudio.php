<?php

class Grado{

    public static function get_gradosEstudio(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT * FROM grados_estudio WHERE estatus = 'A'");
        
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

}