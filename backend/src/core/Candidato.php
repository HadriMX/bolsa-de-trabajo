<?php

class Candidato
{
    public static function update(array $candidato)
    {
        $bandera = 0; //bandera 0 = datos completos, 1 = datos incompletos
        $datosIncompletos = array(); //se guardarán los datos faltantes expecificamente
        $cadenaDatosIncompletos = "";
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

        $stmt->bind_param(
            'issssssiisssssiissss',
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
            $ruta_cv
        );


        if($telefono == null || $telefono == ""){
            array_push($datosIncompletos,"Telefono");
        }
        if($id_municipio == null || $id_municipio == "" || $id_municipio == 0){
            array_push($datosIncompletos,"Municipio");
        }
        if($ciudad == null || $ciudad == ""){
            array_push($datosIncompletos,"Ciudad/Localidad");
        }
        if($colonia == null || $colonia == ""){
            array_push($datosIncompletos,"Colonia");
        }
        if($cp == null || $cp == ""){
            array_push($datosIncompletos,"Codigo postal");
        }
        if($calle == null || $calle == ""){
            array_push($datosIncompletos,"Calle");
        }
        if($num_ext == null || $num_ext == ""){
            array_push($datosIncompletos,"Numero exterior");
        }
        if($id_area_estudio == null || $id_area_estudio == ""){
            array_push($datosIncompletos,"Area de estudio");
        }
        if($escuela == null || $escuela == ""){
            array_push($datosIncompletos,"Escuela");
        }

        if(count($datosIncompletos) >= 1){

            for ($i=0; $i < count($datosIncompletos); $i++) { 
                $cadenaDatosIncompletos = $cadenaDatosIncompletos . $datosIncompletos[$i];
                if($i == count($datosIncompletos) - 1){
                    $cadenaDatosIncompletos = $cadenaDatosIncompletos . ".";
                }else{
                    $cadenaDatosIncompletos = $cadenaDatosIncompletos . ", ";
                }
            }

            return new ErrorResult("Error: Datos incompletos. Porfavor llene todos los datos: " . $cadenaDatosIncompletos, 415);
        }else{

            //se cambia el estatus del usuario de I -> A
        }

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Tu información ha sido guardada correctamente", true);
        } else {
            $output = new ErrorResult("Error: No se pudo guardar la información. Intentelo mas tarde", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function get_candidatos($estatus)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM candidatosvista where estatus=?");
        $stmt->bind_param('s', $estatus);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        return new SuccessResult("", $r);
    }

    public static function get_candidatosInfoCompleta(int $id_usuario)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("SELECT * FROM bdt_bd.candidatos WHERE id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());
        $candidato = $r[0];
        return new SuccessResult("", $candidato);
    }

    public static function delete(int $id_usuario)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus='B' where id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("La cuenta del candidato ha sido desactivada", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function reactivar(int $id_usuario)
    {
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus='A' where id_usuario = ?");
        $stmt->bind_param('i', $id_usuario);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("La cuenta del candidato ha sido activada nuevamente", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function aceptarCandidato(int $id_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus='I' where id_usuario = ?");
        $stmt->bind_param('i',$id_usuario);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            $output=new SuccessResult("Candidato aceptado", true);
            
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }
        $stmt->close();
        return $output;
    }

    public static function rechazarCandidato(int $id_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus='R' where id_usuario = ?");
        $stmt->bind_param('i',$id_usuario);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            $output=new SuccessResult("Candidato rechazado", true);
            
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }
        $stmt->close();
        return $output;
    }


    public static function updateEstatusCandidato($estatus, $id_usuario){
        $db = new Db();
        $conn = $db->getConn();

        $stmt = $conn->prepare("UPDATE usuarios SET estatus=? WHERE id_usuario = ?");
        $stmt->bind_param('si',$estatus,$id_usuario);
        $stmt->execute();


        
        if ($stmt->affected_rows > 0) {
            if($estatus=="R"){
                $output=new SuccessResult("Candidato rechazado", true);
            }elseif ($estatus=="B") {
                $output = new SuccessResult("La cuenta del candidato ha sido desactivada", true);
            }elseif ($estatus=="A") {
                $output = new SuccessResult("La cuenta del candidato ha sido activada nuevamente", true);
            }elseif ($estatus=="I") {
                $output=new SuccessResult("Candidato aceptado", true);
            }  
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }
        $stmt->close();
        return $output;
    }


}
