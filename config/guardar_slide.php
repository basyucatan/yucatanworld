<?php
require_once __DIR__ . '/uploads.php';

$jsonPath = __DIR__ . '/data.json';

$data = file_exists($jsonPath) ? json_decode(file_get_contents($jsonPath), true) : [
    'slides' => [],
    'destinos' => []
];

$tipo = $_POST['tipo'] ?? 'slide'; // 'slide' o 'destino'
$id = $_POST['id'] ?? '';

if ($tipo === 'slide') {
    $slides = $data['slides'] ?? [];
    $isEdit = false;
    $existingIndex = -1;

    if ($id !== '') {
        foreach ($slides as $idx => $s) {
            if ($s['id'] === $id) {
                $isEdit = true;
                $existingIndex = $idx;
                break;
            }
        }
    } else {
        $id = 'slide_' . uniqid();
    }

    $imagenActual = $isEdit ? ($slides[$existingIndex]['imagen'] ?? '') : '';
    $rutaImagen = procesarSubidaImagen('imagen', 'slide', $imagenActual);

    $nuevoItem = [
        'id' => $id,
        'badge' => [
            'es' => trim($_POST['badge_es'] ?? ''),
            'en' => trim($_POST['badge_en'] ?? '')
        ],
        'badgeIcon' => trim($_POST['badgeIcon'] ?? 'fa-star'),
        'titulo' => [
            'es' => trim($_POST['titulo_es'] ?? ''),
            'en' => trim($_POST['titulo_en'] ?? '')
        ],
        'descripcion' => [
            'es' => trim($_POST['desc_es'] ?? ''),
            'en' => trim($_POST['desc_en'] ?? '')
        ],
        'btnTexto' => [
            'es' => trim($_POST['btn_es'] ?? ''),
            'en' => trim($_POST['btn_en'] ?? '')
        ],
        'imagen' => $rutaImagen
    ];

    if ($isEdit) {
        $data['slides'][$existingIndex] = $nuevoItem;
    } else {
        $data['slides'][] = $nuevoItem;
    }

} elseif ($tipo === 'destino') {
    $destinos = $data['destinos'] ?? [];
    $isEdit = false;
    $existingIndex = -1;

    if ($id !== '') {
        foreach ($destinos as $idx => $d) {
            if ($d['id'] === $id) {
                $isEdit = true;
                $existingIndex = $idx;
                break;
            }
        }
    } else {
        $id = 'dest_' . uniqid();
    }

    $imagenActual = $isEdit ? ($destinos[$existingIndex]['imagen'] ?? '') : '';
    $rutaImagen = procesarSubidaImagen('imagen', 'dest', $imagenActual);

    $nuevoItem = [
        'id' => $id,
        'titulo' => trim($_POST['titulo'] ?? ''),
        'tag' => trim($_POST['tag'] ?? ''),
        'info' => [
            'es' => trim($_POST['info_es'] ?? ''),
            'en' => trim($_POST['info_en'] ?? '')
        ],
        'imagen' => $rutaImagen
    ];

    if ($isEdit) {
        $data['destinos'][$existingIndex] = $nuevoItem;
    } else {
        $data['destinos'][] = $nuevoItem;
    }
}

file_put_contents($jsonPath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

$tabRedirect = ($tipo === 'destino') ? '?tab=destinos' : '?tab=slides';
header('Location: index.php' . $tabRedirect);
exit;