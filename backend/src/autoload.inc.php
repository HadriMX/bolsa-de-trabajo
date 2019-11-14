<?php
// @codingStandardsIgnoreFile
// @codeCoverageIgnoreStart
// this is an autogenerated file - do not edit
spl_autoload_register(
    function($class) {
        static $classes = null;
        if ($classes === null) {
            $classes = array(
                'admin' => '/core/Admin.php',
                'area' => '/core/Area.php',
                'auth' => '/core/Auth.php',
                'candidato' => '/core/Candidato.php',
                'categoria' => '/core/Categoria.php',
                'db' => '/core/db_conn.php',
                'empresa' => '/core/Empresa.php',
                'errorresult' => '/core/error.php',
                'mysessionhandler' => '/core/sess_handler.php',
                'solicitud' => '/core/Solicitud.php',
                'successresult' => '/core/success.php',
                'vacante' => '/core/Vacante.php'
            );
        }
        $cn = strtolower($class);
        if (isset($classes[$cn])) {
            require __DIR__ . $classes[$cn];
        }
    },
    true,
    false
);
// @codeCoverageIgnoreEnd
