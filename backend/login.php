<?php
// error_reporting(E_ERROR | E_PARSE);
include "db_conn.php";
require_once "error.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"));
$username = $post->email;
$pwd = $post->pwd;

echo json_encode(login($username,$pwd));

    function login($username, $pwd)
    {
        echo "procesando";
        $db = new Db();
        $conn = $db->getConn();

        $r = $conn->query("SELECT * FROM usuarios WHERE email = Binary '".$username."' AND pw = Binary '".$pwd."'");

        $output;

        if (empty($r)) {
            $e = new ErrorResult(false, 190293, "puytuti");
            $output= json_encode($e);
        }
        else {
            $output = $db->readResult($r);
            $output= json_encode($output);
        }

        return $output;
    }
?>