<?php

class Candidato
{
    public static function update(array $candidato)
    {
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("REPLACE INTO candidatos(id_usuario, nombre, apellido1, apellido2, genero, fecha_nacimiento, calle, colonia, cp, ciudad, id_municipio, id_entidad_federativa, id_grado_estudios, id_area_estudio, id_subarea_estudio, ruta_cv, telefono) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        
        $id_usuario = $candidato['id_usuario'];
        $nombre = $candidato['nombre'];
        $apellido1 = $candidato['apellido1'];
        $apellido2 = $candidato['apellido2'];
        $genero = $candidato['genero'];
        $fecha_nacimiento = $candidato['fecha_nacimiento'];
        $calle = $candidato['calle'];
        $colonia = $candidato['colonia'];
        $cp = $candidato['cp'];
        $ciudad = $candidato['ciudad'];
        $id_municipio = $candidato['id_municipio'];
        $id_entidad_federativa = $candidato['id_entidad_federativa'];
        $id_grado_estudios = $candidato['id_grado_estudios'];
        $id_area_estudio = $candidato['id_area_estudio'];
        $id_subarea_estudio = $candidato['id_subarea_estudio'];
        $ruta_cv = $candidato['ruta_cv'];
        $telefono = $candidato['telefono'];
        
        $stmt->bind_param('isssssssssiiiiiss',
            $id_usuario,
            $nombre,
            $apellido1,
            $apellido2,
            $genero,
            $fecha_nacimiento,
            $calle,
            $colonia,
            $cp,
            $ciudad,
            $id_municipio,
            $id_entidad_federativa,
            $id_grado_estudios,
            $id_area_estudio,
            $id_subarea_estudio,
            $ruta_cv,
            $telefono);

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Update OK", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function postular($id_vacante, $id_candidato, $fecha){

        return new SuccessResult("Llegó a funcion postular", true);
    }
}
