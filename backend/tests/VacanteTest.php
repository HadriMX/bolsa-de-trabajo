<?php

require_once 'phpunit.phar';

use PHPUnit\Framework\TestCase;

final class VacanteTest extends TestCase
{
    public function testRegistrarVacante(): void
    {
        $vacante = array(
            'titulo_vacante' => "COORDINADOR DE PERSONAL DE LIMPIEZA",
            'id_usuario' => 17,
            'puesto' => "Coordinador de personal de limpieza",
            'descripcion_puesto' => "REQUISITOS:
     Escolaridad: Preparatoria o Carrera Trunca.
     Sexo: Indistinto
     Edad: 25 a 40 años.
     Experiencia: 1 año en Manejo de personal
     Disponibilidad de horario

FUNCIONES:
     Manejo de personal
     Manejo de conflictos
     Control de documentación
     Control de inventarios
     Atención al cliente
     Llenado de registros

OFRECEMOS:

     Sueldo: $2,000 semanales.
     Prestaciones de Ley.
     Uniforme
     Comedor",
            'id_area_estudio' => 50,
            'sueldo' => 6500,
            'genero' => "I",
            'direccion' => "Pedro Escobedo",
            'id_entidad_federativa' => 22
        );

        $actual = Vacante::insert($vacante);
        $this->assertInstanceOf(SuccessResult::class, $actual);
    }
}