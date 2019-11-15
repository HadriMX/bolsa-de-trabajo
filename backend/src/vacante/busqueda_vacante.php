<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Allow: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once '../core/cors.php';

require_once '../autoload.inc.php';
require_once '../core/session_starter.php';

$post = json_decode(file_get_contents("php://input"));

$titulo = $post->InputTitulo;
$ubicacion = $post->InputUbicacion;
$idsueldo =$post->SelectedSalario;
$idfecha = $post->SelectedFecha;
$idarea = $post->SelectedArea;

$response = getVacantes($titulo,$ubicacion,$idsueldo,$idfecha,$idarea);
echo json_encode($response);

function getVacantes($titulo,$ubicacion,$idsueldo,$idfecha,$idarea)
{
    $arraySueldos = [
        1 => "0",
        2 => "5000",
        3 => "10000",
        4 => "15000",
        5 => "20000",
        6 => "30000",
        7 => "40000",
        8 => "60000",
        9 => "80000",
        10 => "9999999"
    ];
    
    $arrayFechas = [
        1 => "7",
        2 => "14",
        3 => "30",
        4 => "60",
        5 => "120",
        6 => "180",
    ];
    //////////////////////////////////////////////
    $db = new Db();
    $conn = $db->getConn();

    $tituloBool= 1;
    $ubicacionBool= 1;
    $sueldoBool= 1;
    $fechaBool= 1;
    $areaBool= 1;

    //variables para definir el rango del sueldo y numero de dias en la fecha
    $sueldoInicial = "";
    $sueldoFinal = "";
    $dias = "";

    if($titulo != ""){
        $tituloBool = 0;
    }
    if($ubicacion != ""){
        $ubicacionBool = 0;
    }
    if($idsueldo != "0"){
        $sueldoBool = 0;
        $sueldoInicial = $arraySueldos[intval($idsueldo)];
        $sueldoFinal = $arraySueldos[intval($idsueldo) + 1];
    }
    if($idfecha != "0"){
        $fechaBool = 0;
        $dias = $arrayFechas[intval($idfecha)];
    }
    if($idarea != "0"){
        $areaBool = 0;
    }
    
    $stmt = $conn->prepare("SELECT nombre FROM areas_estudio WHERE (id_area_estudio = ?)");
    $stmt->bind_param("i",$idarea);

    $stmt->execute();
    $nombreResult = $db->readResult($stmt->get_result()); //obtengo el nombre del area mediante el id
    if (empty($nombreResult)) {
        $nombreArea = "";
    } else {
        $nombreArea = $nombreResult[0]["nombre"];
    }

    $id_usuario = $_SESSION["currentUser"]["id_usuario"];
    $stmt = $conn->prepare("SELECT * FROM vacantes_activos WHERE ((titulo_vacante LIKE ?) or ?) AND ((entidad_federativa LIKE ?) or ?) AND ((sueldo >= ? AND sueldo <= ?) or ?) AND ((fecha_publicacion >= (NOW() - INTERVAL ? DAY)) or ? ) AND ((area_estudio LIKE ?) or ? ) AND (id_vacante NOT IN (SELECT id_vacante FROM postulados WHERE id_candidato = ?))");
    $titulo = "%".$titulo."%";
    $ubicacion = "%".$ubicacion."%";
    $nombreArea = "%".$nombreArea."%";
    
    $stmt->bind_param("sisissisisii",$titulo,$tituloBool,$ubicacion,$ubicacionBool,$sueldoInicial,$sueldoFinal,$sueldoBool,$dias,$fechaBool,$nombreArea,$areaBool,$id_usuario);

    $stmt->execute();
    $r = $db->readResult($stmt->get_result());

    return new SuccessResult("", $r);
}
