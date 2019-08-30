<?php

class ErrorResult {
    public $code;
    public $error_message;
    public $success;

    public function __construct($success, $code, $error_message)
    {
        $this->code = $code;
        $this->error_message = $error_message;
        $this->success = $success;
    }
}