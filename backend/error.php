<?php

class ErrorResult {
    public $message;
    public $code;
    public $success;

    public function __construct(string $error_message, int $code)
    {
        $this->message = $error_message;
        $this->code = $code;
        $this->success = false;
    }
}
