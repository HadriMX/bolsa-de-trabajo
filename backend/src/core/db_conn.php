<?php

require_once('error.php');

class Db {
    private $server_name = '192.168.1.200';
    private $username = 'root';
    private $pwd = 'some_pass';
    private $db_name = 'bdt_bd';

    private $conn;
    
    public function __construct()
    {
        $this->conn = new mysqli($this->server_name, $this->username, $this->pwd, $this->db_name);
        $this->conn->set_charset("utf8");
    }

    public function getConn()
    {
        if ($this->conn->connect_error) {
            $error = new ErrorResult("No se pudo conectar a la BD", 0);
            return $error;
        }

        return $this->conn;
    }

    public function readResult(mysqli_result $result)
    {
        try {
            $output = array();
            
            while ($row = $result->fetch_assoc()) {
                $output[] = $row;
            }
        
            return $output;
        } catch (\Throwable $th) {
            $error = new ErrorResult($th->getMessage(), 500);
            return $error;
        }
    }
}

?>