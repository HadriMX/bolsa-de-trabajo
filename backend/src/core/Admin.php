<?php

class Admin {
    static function add_area(string $area_estudio,string $estatus) {
        if ($area_estudio<>'') {
            $db = new Db();
            $conn = $db->getConn();
            $insertar = $conn->prepare("INSERT INTO areas_estudio (nombre,estatus)VALUES (?,?)");
            $insertar->bind_param("ss",$area_estudio,$estatus);
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


function add_categoria(string $categoria,string $estatus){
    
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
}