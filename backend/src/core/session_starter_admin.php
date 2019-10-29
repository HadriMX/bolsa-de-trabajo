<?php

require_once 'session_starter.php';

if ($_SESSION['currentUser']['id_tipo_usuario'] != 1) {
    http_response_code(403);
    die();
}