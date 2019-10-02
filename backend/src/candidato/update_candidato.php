<?php

require_once './core/sess_handler.php'; // esta línea es necesaria para sobreescribir la implementación de sesiones
require_once 'autoload.inc.php';

error_reporting(E_ERROR | E_PARSE);
session_start();

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST');
header('content-type: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"));

$candidato = (array) $post;

// $apellido1 = $post->apellido1;
// $apellido2 = $post->apellido2;
// $calle = $post->calle;
// $ciudad = $post->ciudad;
// $colonia = $post->colonia;
// $cp = $post->cp;
// $fecha_nacimiento = $post->fecha_nacimiento;
// $genero = $post->genero;
// $id_area_estudio = $post->id_area_estudio;
// $id_entidad_federativa = $post->id_entidad_federativa;
// $id_grado_estudios = $post->id_grado_estudios;
// $id_municipio = $post->id_municipio;
// $id_subarea_estudio = $post->id_subarea_estudio;
// $nombre = $post->nombre;
// $ruta_cv = $post->ruta_cv;
// $telefono = $post->telefono;
