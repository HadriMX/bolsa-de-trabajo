<?php

class SuccessResult
{
    public $message;
    public $data;
    public $success;

    public function __construct(string $message, $data)
    {
        $this->message = $message;
        $this->data = $data;
        $this->success = true;
    }
}
