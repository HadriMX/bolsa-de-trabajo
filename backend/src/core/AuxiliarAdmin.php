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

    public static function update_estatus_auxiliarAdmin($estatus, $id_usuario){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("UPDATE usuarios SET estatus=? WHERE id_usuario = ?");
        $stmt->bind_param('si',$estatus,$id_usuario);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            if($estatus=="B"){
                $output=new SuccessResult("Cuenta desactivada", true);
            }elseif ($estatus=="A") {
                $output = new SuccessResult("Cuenta activada nuevamente", true);
            }
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }
        $stmt->close();
        return $output;
    }

    
}
