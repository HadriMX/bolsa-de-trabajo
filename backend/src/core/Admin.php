<?php

class Admin {
    public static function add_area(string $area_estudio,string $estatus) {
        if ($area_estudio<>'') {
            $db = new Db();
            $conn = $db->getConn();
            $insertar = $conn->prepare("INSERT INTO areas_estudio (nombre,estatus)VALUES (?,?)");
            $insertar->bind_param("ss", $area_estudio, $estatus);
            $resultado = $insertar->execute();
            if ($resultado == true) {
                $output = new SuccessResult("Registro correcto", true);
            } else {
                $err = new ErrorResult("Error de registro", 401);
                $output = $err;
            }
        } 
    
        return $output;
    }
    
    public static function add_categoria(string $categoria,string $estatus){
    
        if($categoria<>''){
            
            $db = new Db();
            $conn = $db->getConn();
            $insertar = $conn->prepare("INSERT INTO tipos_empresa (nombre_empresa,estatus)VALUES (?,?)");
            $insertar->bind_param("ss",$categoria,$estatus);
            $resultado = $insertar->execute();
            if ($resultado==true) {
                $output = new SuccessResult("Registro correcto", true);
            }
            else {
                $err = new ErrorResult("Error de registro", 401);
                $output = $err;
            }
        }
        return $output;
    }

    public static function update_categoria(string $estatus){
        $db = new Db();
        $conn = $db->getConn();
        $insertar = $conn->prepare("REPLACE INTO tipos_empresa (estatus)VALUES (?)");
        $insertar->bind_param("s",$estatus);
        $resultado = $insertar->execute();
        if ($resultado==true) {
            $output = new SuccessResult("Modificación correcta", true);
        }
        else {
            $err = new ErrorResult("Error", 401);
            $output = $err;
        }
        
        return $output;
    }

    public static function get_categoriasAdmin(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM tipos_empresa");
        
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    public static function get_areasAdmin(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM areas_estudio");
        
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    public static function get_solicitudes(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM solicitudes");
        
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    public static function get_areas(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM areasactivas");

        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }
}
