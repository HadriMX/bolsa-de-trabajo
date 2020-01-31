<?php

define('UPLOAD_MAX_FILESIZE', ini_get('upload_max_filesize'), true);

class FileUpload
{
    private $errorMessages = array(
        1 => 'El tamaño del archivo excede el tamaño máximo permitido (' . UPLOAD_MAX_FILESIZE . ').',
        2 => 'El tamaño del archivo excede el tamaño máximo permitido por el formulario.',
        3 => 'El archivo solo se subió parcialmente.',
        4 => 'No se subió ningún archivo.',
        6 => 'Error en el servidor: falta carpeta temporal.',
        7 => 'Error en el servidor: error al escribir en disco.',
        8 => 'Error en el servidor: una extensión detuvo la subida.',
    );

    public static function get_upload_dir() {
        return $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
    }

    public static function upload(array $fileData, bool $noReplace, string $newFileName = "")
    {
        $result = array();

        if ($fileData) {
            $uploadFileName = $fileData['name'];
            $tmpUploadedFilename = $fileData['tmp_name'];
            $error = $fileData['error'];

            if ($error > 0) {
                $result = new ErrorResult(self::$errorMessages[$error], $error);
            } else {
                if ($newFileName != "") {
                    $uploadFileName = $newFileName;
                }

                $prefix = $noReplace ? time() . rand(10, 99) : "";
                $uploadFileName = preg_replace('/[\s,_]+/', '-', $uploadFileName);
                $fileName = strtolower($prefix . "_" . $_SESSION['currentUser']['id_usuario'] . "_" . $uploadFileName);
                $fileName = basename($fileName);
                $fullFilePath = self::get_upload_dir() . $fileName;

                if (move_uploaded_file($tmpUploadedFilename, $fullFilePath)) {
                    $fileData = array('file_name' => $fileName);
                    $result = new SuccessResult("Archivo subido correctamente.", $fileData);
                } else {
                    $result = new ErrorResult("Error al guardar el archivo en el servidor.", 500);
                }
            }
        } else {
            $result = new ErrorResult("No se envió ningún archivo.", 400);
        }

        return $result;
    }
}
