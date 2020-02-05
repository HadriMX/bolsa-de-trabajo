<?php

class AuxiliarAdmin{
    public static function get_auxiliares(string $estatus) {
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT email from usuarios WHERE  estatus =?");
        
        $stmt->bind_param('s', $estatus);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    
}
