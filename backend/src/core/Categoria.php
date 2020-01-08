<?php

class Categoria{  

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
                $err = new ErrorResult("Error de registro", 501);
                $output = $err;
            }
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

    public static function update_categoria( array $categoria){
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("REPLACE into tipos_empresa (id_tipo_empresa,nombre_empresa,estatus) VALUES (?,?,?)");

        $id_tipo_empresa= $categoria['id_tipo_empresa'];
        $nombre_empresa= $categoria['nombre_empresa'];
        $estatus=$categoria['estatus'];

        $stmt->bind_param("iss",$id_tipo_empresa,$nombre_empresa,$estatus);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Cambios guardados", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }
}