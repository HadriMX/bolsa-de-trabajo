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

    public function testValidarEmailCorrecto()
    {
        $actual = Auth::validate_email("username@example.com");
        $this->assertEquals(1, $actual);
    }

    public function testValidarEmailIncorrecto()
    {
        $actual = Auth::validate_email("qwerty@example");
        $this->assertEquals(0, $actual);
    }

    public function testValidarPasswordIncorrectoQueUsaSoloLetras()
    {
        $actual = Auth::validate_password("abcdefghij");
        $this->assertEquals(0, $actual);
    }

    public function testValidarPasswordIncorrectoQueUsaSoloNumeros()
    {
        $actual = Auth::validate_password("1234567890");
        $this->assertEquals(0, $actual);
    }

    public function testValidarPasswordIncorrectoQueNoUsaCaracterEspecial()
    {
        $actual = Auth::validate_password("1234abcd");
        $this->assertEquals(0, $actual);
    }

    public function testValidarPasswordIncorrectoMuyCorto()
    {
        $actual = Auth::validate_password("ab12!");
        $this->assertEquals(0, $actual);
    }

    public function testValidarPasswordCorrecto()
    {
        $actual = Auth::validate_password("qwerty123#");
        $this->assertEquals(1, $actual);
    }

    // public function testRegistrarUsuarioValido()
    // {
    //     $usuario = array(
    //         'email' => 'admin@volar.org.mx',
    //         'password' => 'admin123#',
    //         'id_tipo_usuario' => 0,
    //     );

    //     $actual = Auth::register($usuario);

    //     $this->assertInstanceOf(
    //         SuccessResult::class,
    //         $actual
    //     );
    // }

    public function testVerificacionDeEmailConCodigoIncorrecto()
    {
        $actual = Auth::verify_email("noexisto");
        $this->assertEquals(404, $actual->code);
    }

    public function testVerificacionEmailCuandoYaSeVerifico()
    {
        $actual = Auth::verify_email("{6A1756B0-6308-413D-AD89-6313AD579496}");
        $this->assertEquals(4000, $actual->code);
    }

    // public function testVerificarEmail()
    // {
    //     $actual = Auth::verify_email("17f46354263d7c184e83073725a7dfe6");
    //     $this->assertInstanceOf(
    //         SuccessResult::class,
    //         $actual
    //     );
    // }
}
