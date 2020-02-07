<?php

require_once 'session_starter.php';

if ($_SESSION['currentUser']['id_tipo_usuario'] != 100) {
    http_response_code(403);
    die();
}