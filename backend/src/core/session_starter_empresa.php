<?php

require_once 'session_starter.php';

$id_tipo_usuario = $_SESSION['currentUser']['id_tipo_usuario'];
if ($id_tipo_usuario != 0 && $id_tipo_usuario != 2) {
    http_response_code(403);
    die();
}
