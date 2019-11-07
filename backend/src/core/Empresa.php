<?php

class Empresa
{
    public static function get_empresas(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM  empresasvista");

        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }
}