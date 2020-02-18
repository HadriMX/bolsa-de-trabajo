<?php

define('UPLOAD_MAX_FILESIZE', ini_get('upload_max_filesize'));

class FileUpload
{
    private static $errorMessages = array(
        1 => 'El tamaño del archivo excede el tamaño máximo permitido (' . UPLOAD_MAX_FILESIZE . ').',
        2 => 'El tamaño del archivo excede el tamaño máximo permitido por el formulario.',
        3 => 'El archivo solo se subió parcialmente.',
        4 => 'No se subió ningún archivo.',
        6 => 'Error en el servidor: falta carpeta temporal.',
        7 => 'Error en el servidor: error al escribir en disco.',
        8 => 'Error en el servidor: una extensión detuvo la subida.',
        9 => 'El formato del archivo no está permitido.'
    );

    private static $allowedFileTypes = array(
        '.pdf' => 'application/pdf'
    );

    public static function get_upload_dir()
    {
        return $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
    }

    public static function upload(?array $fileData, string $newFileName, bool $noReplace = true)
    {
        $result = array();

        if ($fileData) {
            $uploadFileName = pathinfo($fileData['name'], PATHINFO_FILENAME);
            $tmpUploadedFilename = $fileData['tmp_name'];
            $error = $fileData['error'];
            $mimeType = mime_content_type($tmpUploadedFilename);
            $fileExtension = array_search($mimeType, self::$allowedFileTypes);

            if ($error === 0 && $fileExtension === false) {
                $error = 9;
            }

            if ($error > 0) {
                $result = new ErrorResult(self::$errorMessages[$error], $error);
            } else {
                if ($newFileName != "") {
                    $uploadFileName = $newFileName;
                }

                $currentUserId = $_SESSION['currentUser']['id_usuario'];
                $prefix = $noReplace ? time() . rand(10, 99) : "";
                $uploadFileName = preg_replace('/[\s,_]+/', '-', $uploadFileName) . $fileExtension; // convertir espacios en guiones
                $fileName = basename(strtolower($prefix . self::get_file_name($uploadFileName, $currentUserId)));
                $fullFilePath = self::get_upload_dir() . $fileName;

                self::delete_file($newFileName, $currentUserId);

                if (move_uploaded_file($tmpUploadedFilename, $fullFilePath)) {
                    $result = $fileName;
                } else {
                    $result = new ErrorResult("Error al guardar el archivo en el servidor.", 500);
                }
            }
        } else {
            $result = new ErrorResult("No se envió ningún archivo.", 400);
        }

        return $result;
    }

    /*
    Comprueba que exista el archivo correspondiente al usuario actual.
    Por ejemplo: check_file_exists("curriculum") comprueba que exista su archivo correspondiente según el campo ruta_cv en la BD
    */
    public static function check_file_exists(string $filename)
    {
        $filePath = $_SESSION["currentUser"]["ruta_" . $filename];
        if (empty($filePath))
            return false;

        $fullFilePath = self::get_upload_dir() . $filePath;
        return file_exists($fullFilePath);
        // $fileExists = false;

        // $extensions = array_keys(self::$allowedFileTypes);
        // foreach ($extensions as $ext) {
        //     $fullFilePath = self::get_upload_dir() . self::get_file_name($filename, $id_usuario) . $ext;

        //     if (file_exists($fullFilePath))
        //         return true;
        // }

        // return $fileExists;
    }

    public static function delete_file(string $filename, $id_usuario)
    {
        $extensions = array_keys(self::$allowedFileTypes);
        foreach ($extensions as $ext) {
            $pattern = self::get_upload_dir() . "*" . self::get_file_name($filename, $id_usuario) . $ext;
            array_map('unlink', glob($pattern));
        }
    }

    public static function get_file_name(string $filename, $id_usuario)
    {
        return "_" . $id_usuario . "_" . $filename;
    }
}
