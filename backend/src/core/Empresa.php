<?php

class Empresa
{
    public static function get_empresas($estatus){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM  empresasvista where status=?");
        $stmt->bind_param('s', $estatus);
        $stmt->execute();


        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    public static function delete_empresa(int $id_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus='B' where id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("La cuenta de la empresa ha sido desactivada", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function reactivar_empresa(int $id_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus='A' where id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("La cuenta de la empresa ha sido activada nuevamente", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }
}