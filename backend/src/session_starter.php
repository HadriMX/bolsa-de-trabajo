<?php

require_once 'core/sess_handler.php'; // esta línea es necesaria para sobreescribir la implementación de sesiones

if (isset($_GET['phpsessid'])) {
    session_id($_GET['phpsessid']);
}

session_start();
