<?php

class AuxiliarAdmin{
    public static function get_auxiliares($estatus) {
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT id_usuario,email,estatus FROM usuarios WHERE id_tipo_usuario=100 AND estatus =?");
        
        $stmt->bind_param('s', $estatus);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    
}
