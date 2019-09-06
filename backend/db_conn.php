<?php

include "error.php";

class Db {
    private $server_name = '192.168.1.200';
    private $username = 'root';
    private $pwd = '';
    private $db_name = 'bdt_bd';

    private $conn;
    
    public function __construct()
    {
        $this->conn = new mysqli($this->server_name, $this->username, $this->pwd, $this->db_name);
    }

    public function getConn()
    {
        if ($this->conn->connect_error) {
            $error = new ErrorResult(false, 0, "No se pudo conectar a la BD");
            return $error;
        }

        return $this->conn;
    }

    public function readResult($result)
    {
        try {
            $output = array();
            
            while ($row = $result->fetch_assoc()) {
                $output[] = $row;
            }
        
            return $output;
        } catch (\Throwable $th) {
            $error = new ErrorResult(false, 5, "Error al leer el resultado");
            return $error;
        }
    }
}

?>