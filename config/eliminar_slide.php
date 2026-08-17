<?php
require_once __DIR__ . '/uploads.php';

$jsonPath = __DIR__ . '/data.json';
$id = $_GET['id'] ?? '';
$tipo = $_GET['tipo'] ?? 'slide'; // 'slide' o 'destino'

if (!$id || !file_exists($jsonPath)) {
    header('Location: index.php');
    exit;
}

$data = json_decode(file_get_contents($jsonPath), true);

if ($tipo === 'slide' && isset($data['slides'])) {
    $nuevosSlides = [];
    foreach ($data['slides'] as $s) {
        if ($s['id'] === $id) {
            moverImagenABorrados($s['imagen'] ?? '');
        } else {
            $nuevosSlides[] = $s;
        }
    }
    $data['slides'] = $nuevosSlides;

} elseif ($tipo === 'destino' && isset($data['destinos'])) {
    $nuevosDestinos = [];
    foreach ($data['destinos'] as $d) {
        if ($d['id'] === $id) {
            moverImagenABorrados($d['imagen'] ?? '');
        } else {
            $nuevosDestinos[] = $d;
        }
    }
    $data['destinos'] = $nuevosDestinos;
}

file_put_contents($jsonPath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

$tabRedirect = ($tipo === 'destino') ? '?tab=destinos' : '?tab=slides';
header('Location: index.php' . $tabRedirect);
exit;