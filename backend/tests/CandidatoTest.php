<?php

require_once 'phpunit.phar';

use PHPUnit\Framework\TestCase;

final class CandidatoTest extends TestCase
{
    public function testActualizarDatos(): void
    {
        $candidato = array(
            'id_usuario' => 1,
            'nombre' => 'J. Adrián',
            'apellido1' => "Reyes",
            'apellido2' => "Beltran",
            'genero' => "H",
            'fecha_nacimiento' => "1998-11-17",
            'calle' => "Independencia",
            'colonia' => "Cerezas",
            'cp' => "81200",
            'ciudad' => "Los Mochis",
            'id_municipio' => 1,
            'id_entidad_federativa' => 1,
            'id_grado_estudios' => 1,
            'id_area_estudio' => 1,
            'id_subarea_estudio' => 1,
            'ruta_cv' => "/ruta/al/archivo/cv.pdf",
            'telefono' => "6681459851");

        $actual = Candidato::update($candidato);
        $this->assertInstanceOf(SuccessResult::class, $actual);
    }
}
