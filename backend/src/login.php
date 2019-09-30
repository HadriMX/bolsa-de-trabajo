<?php

error_reporting(E_ERROR | E_PARSE);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST');
header('content-type: application/json; charset=utf-8');


require_once 'session_starter.php';
require_once 'autoload.inc.php';

$post = json_decode(file_get_contents("php://input"));
$username = $post->email;
$pwd = $post->pwd;

$response = Auth::login($username, $pwd);

if (is_a($response, 'SuccessResult')) {
    $response->data['phpsessid'] = session_id();
    $_SESSION['currentUser'] = $response->data;
}

echo json_encode($response);

?>