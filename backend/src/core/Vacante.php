<?php

class Vacante
{
    public static function insert(array $vacante)
    {
        $db = new Db();
        $conn = $db->getConn();
        $stmt = $conn->prepare("INSERT INTO vacantes(titulo_vacante, id_usuario, puesto, descripcion_puesto, id_area_estudio, sueldo, genero, direccion, id_entidad_federativa) VALUES (?,?,?,?,?,?,?,?,?)");
        
        $titulo_vacante = $vacante['titulo_vacante'];
        $id_usuario = $vacante['id_usuario'];
        $puesto = $vacante['puesto'];
        $descripcion_puesto = $vacante['descripcion_puesto'];
        $id_area_estudio = $vacante['id_area_estudio'];
        $sueldo = $vacante['sueldo'];
        $genero = $vacante['genero'];
        $direccion = $vacante['direccion'];
        $id_entidad_federativa = $vacante['id_entidad_federativa'];

        $stmt->bind_param("sissidssi",
            $titulo_vacante,
            $id_usuario,
            $puesto,
            $descripcion_puesto,
            $id_area_estudio,
            $sueldo,
            $genero,
            $direccion,
            $id_entidad_federativa);

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $output = new SuccessResult("Vacante registrada correctamente", true);
        } else {
            $output = new ErrorResult("No se pudo actualizar la base de datos.", 515);
        }

        $stmt->close();

        return $output;
    }

    public static function get_mis_vacantes()
    {
        $db = new Db();
        $conn = $db->getConn();

        $id_empresa = $_SESSION['currentUser']['id_usuario'];

        $stmt = $conn->prepare("SELECT * FROM vacantes_activos WHERE id_empresa = ?");
        $stmt->bind_param("i", $id_empresa);
        $stmt->execute();
        $r = $db->readResult($stmt->get_result());

        return new SuccessResult("", $r);
    }
}