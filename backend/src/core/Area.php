<?php

class Area{
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

    public static function get_areasAdmin(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM areas_estudio");
        
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    public static function get_areasMenu(){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM areasactivas");

        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    public static function update_areaEstudio( array $areaEstudio){
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("REPLACE INTO areas_estudio (id_area_estudio,nombre,estatus,)VALUES (?,?,?)");

        $id_area_estudio=$areaEstudio['id_area_estudio'];
        $nombre=$areaEstudio['nombre'];
        $estatus=$areaEstudio['estatus'];


        $stmt->bind_param("i,s,s",$id_area_estudio,$nombre,$estatus);
        $stmt->execute();

       if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Update OK", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }
}
