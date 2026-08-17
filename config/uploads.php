<?php

function procesarSubidaImagen($fileInputName, $prefix, $imagenActual = '') {
    $baseDir = __DIR__ . '/../img/';
    $defaultImage = 'img/imgFallida.jpg';

    if (isset($_FILES[$fileInputName]) && $_FILES[$fileInputName]['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES[$fileInputName]['name'], PATHINFO_EXTENSION));
        $validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

        if (in_array($ext, $validExtensions)) {
            $fileName = $prefix . '_' . time() . '.' . $ext;
            $targetPath = $baseDir . $fileName;

            if (move_uploaded_file($_FILES[$fileInputName]['tmp_name'], $targetPath)) {
                return 'img/' . $fileName;
            }
        }
    }

    return !empty($imagenActual) ? $imagenActual : $defaultImage;
}

function moverImagenABorrados($relativeImgPath) {
    if (empty($relativeImgPath)) {
        return;
    }

    $fileName = strtolower(basename($relativeImgPath));

    // Proteger imágenes del sistema para que NUNCA se muevan a borrados
    $imagenesProtegidas = ['imgfallida.jpg', 'logo.png', 'logo.jpg', 'logo.svg', 'favicon.ico'];
    if (in_array($fileName, $imagenesProtegidas)) {
        return;
    }

    $baseDir = __DIR__ . '/../';
    $sourcePath = $baseDir . $relativeImgPath;

    if (file_exists($sourcePath)) {
        $borradosDir = $baseDir . 'img/borrados/';
        if (!file_exists($borradosDir)) {
            mkdir($borradosDir, 0777, true);
        }

        rename($sourcePath, $borradosDir . basename($relativeImgPath));
    }
}