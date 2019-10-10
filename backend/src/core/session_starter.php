<?php

require_once 'sess_handler.php'; // esta línea es necesaria para sobreescribir la implementación de sesiones

if (isset($_GET['phpsessid'])) {
    session_id($_GET['phpsessid']);
}

session_start();

if (empty($_SESSION['currentUser'])) {
    http_response_code(401);
    die();
}
