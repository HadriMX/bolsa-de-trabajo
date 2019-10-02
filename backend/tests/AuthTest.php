<?php

require_once 'phpunit.phar';

use PHPUnit\Framework\TestCase;

final class AuthTest extends TestCase
{
    public function testLoginNoIniciarSesionConPasswordIncorrecto(): void
    {
        $actual = Auth::login("mainfre@hotmail.com", "1234");
        $this->assertEquals(401, $actual->code);
    }

    public function testLoginConPasswordCorrecto(): void
    {
        $actual = Auth::login("mainfre@hotmail.com", "1234abcd");
        $this->assertInstanceOf(
            SuccessResult::class,
            $actual
        );
    }

    public function testLoginUsuarioNoEncontrado(): void
    {
        $actual = Auth::login("ergsrh5eg4s5t", "x");
        $this->assertEquals(404, $actual->code);
    }
}
