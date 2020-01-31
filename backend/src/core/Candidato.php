<?php

class Candidato
{
    public static function update(array $candidato)
    {
        $bandera = 0; //bandera 0 = datos completos, 1 = datos incompletos
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("REPLACE INTO candidatos(id_usuario, nombre, apellido1, apellido2, fecha_nacimiento, genero, telefono, id_entidad_federativa, id_municipio, ciudad, colonia, cp, calle, num_ext, id_grado_estudios, id_area_estudio, escuela, ruta_curp, ruta_id, ruta_cv) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        
        //info personal
        $id_usuario = $candidato['id_usuario'];
        $nombre = $candidato['nombre'];
        $apellido1 = $candidato['apellido1'];
        $apellido2 = $candidato['apellido2'];
        $fecha_nacimiento = $candidato['fecha_nacimiento'];
        $genero = $candidato['genero'];
        $telefono = trim($candidato['telefono']);
        
        //direccion
        $id_entidad_federativa = $candidato['id_entidad_federativa'];
        $id_municipio = $candidato['id_municipio'];
        $ciudad = trim($candidato['ciudad']);
        $colonia = trim($candidato['colonia']);
        $cp = $candidato['cp'];
        $calle = trim($candidato['calle']);
        $num_ext = $candidato['num_ext'];
        
        //info academica
        $id_grado_estudios = $candidato['id_grado_estudios'];
        $id_area_estudio = $candidato['id_area_estudio'];
        $escuela = trim($candidato['escuela']);
        $ruta_curp = $candidato['ruta_curp'];
        $ruta_id = $candidato['ruta_id'];
        $ruta_cv = $candidato['ruta_cv'];
        
        $stmt->bind_param('issssssiisssssiissss',
        $id_usuario,
        $nombre,
        $apellido1,
        $apellido2,
        $fecha_nacimiento,
        $genero,
        $telefono,
        $id_entidad_federativa,
        $id_municipio,
        $ciudad,
        $colonia,
        $cp,
        $calle,
        $num_ext,
        $id_grado_estudios,
        $id_area_estudio,
        $escuela,
        $ruta_curp,
        $ruta_id,
        $ruta_cv);

        //Falta validar datos aún

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Tu información ha sido guardada correctamente (Falta validar)", true);
        } else {
            $output = new ErrorResult("Error: No se pudo guardar la información. Intentelo mas tarde", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function get_candidatos($estatus){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT  * FROM candidatosvista where estatus=?");
        $stmt->bind_param('s', $estatus);
        $stmt->execute();

        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r);
    }

    public static function get_candidatosInfoCompleta(int $id_usuario){
        $db = new Db();
        $conn = $db->getConn();
        
        $stmt = $conn->prepare("SELECT * FROM bdt_bd.candidatos WHERE id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();

        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("",$r[0]);
    }

    public static function delete(int $id_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus='B' where id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("El usuario ha sido eliminado", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function reactivar(int $id_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus='A' where id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("El usuario ha sido activado", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }
}
