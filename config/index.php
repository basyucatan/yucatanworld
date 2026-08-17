<?php
$jsonPath = __DIR__ . '/data.json';
$data = file_exists($jsonPath) ? json_decode(file_get_contents($jsonPath), true) : ['slides' => [], 'destinos' => []];

$slides = $data['slides'] ?? [];
$destinos = $data['destinos'] ?? [];

$activeTab = $_GET['tab'] ?? 'slides';

// Edición de Slide
$editSlide = null;
if (isset($_GET['edit_slide'])) {
    $activeTab = 'slides';
    foreach ($slides as $s) {
        if ($s['id'] === $_GET['edit_slide']) {
            $editSlide = $s;
            break;
        }
    }
}

// Edición de Destino
$editDestino = null;
if (isset($_GET['edit_destino'])) {
    $activeTab = 'destinos';
    foreach ($destinos as $d) {
        if ($d['id'] === $_GET['edit_destino']) {
            $editDestino = $d;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración | Yucatán World</title>
    <link rel="icon" type="image/x-icon" href="../img/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="fas fa-sliders-h me-2"></i> Panel de Configuración</h2>
        <div class="d-flex align-items-center gap-3">
            <div class="btn-group btn-group-sm" role="group">
                <button type="button" class="btn btn-primary active lang-btn" data-lang="es">Español (ES)</button>
                <button type="button" class="btn btn-outline-primary lang-btn" data-lang="en">English (EN)</button>
            </div>
            <a href="../" target="_blank" class="btn btn-outline-primary btn-sm"><i class="fas fa-external-link-alt"></i> Ver Landing Page</a>
        </div>
    </div>

    <!-- PESTAÑAS -->
    <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
            <a class="nav-link <?= $activeTab === 'slides' ? 'active fw-bold' : '' ?>" href="index.php?tab=slides">
                <i class="fas fa-images me-1"></i> Slides del Carrusel (<?= count($slides) ?>)
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link <?= $activeTab === 'destinos' ? 'active fw-bold' : '' ?>" href="index.php?tab=destinos">
                <i class="fas fa-map-marked-alt me-1"></i> Catálogo de Destinos (<?= count($destinos) ?>)
            </a>
        </li>
    </ul>

    <?php if ($activeTab === 'slides'): ?>
    <!-- SECCIÓN SLIDES -->
    <div class="row g-4">
        <div class="col-lg-5">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-primary text-white">
                    <h5 class="card-title mb-0"><?= $editSlide ? 'Editar Slide' : 'Nuevo Slide' ?></h5>
                </div>
                <div class="card-body">
                    <form action="guardar_slide.php" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="tipo" value="slide">
                        <input type="hidden" name="id" value="<?= $editSlide['id'] ?? '' ?>">

                        <div class="mb-2 lang-es-field">
                            <label class="form-label small">Badge (ES)</label>
                            <input type="text" class="form-control form-control-sm" name="badge_es" value="<?= $editSlide['badge']['es'] ?? '' ?>" required>
                        </div>
                        <div class="mb-2 lang-en-field">
                            <label class="form-label small">Badge (EN)</label>
                            <input type="text" class="form-control form-control-sm" name="badge_en" value="<?= $editSlide['badge']['en'] ?? '' ?>">
                        </div>

                        <div class="mb-2">
                            <label class="form-label small">Icono FontAwesome (Ej: fa-fire)</label>
                            <input type="text" class="form-control form-control-sm" name="badgeIcon" value="<?= $editSlide['badgeIcon'] ?? 'fa-fire' ?>" required>
                        </div>

                        <div class="mb-2 lang-es-field">
                            <label class="form-label small">Título (ES)</label>
                            <input type="text" class="form-control form-control-sm" name="titulo_es" value="<?= $editSlide['titulo']['es'] ?? '' ?>" required>
                        </div>
                        <div class="mb-2 lang-en-field">
                            <label class="form-label small">Título (EN)</label>
                            <input type="text" class="form-control form-control-sm" name="titulo_en" value="<?= $editSlide['titulo']['en'] ?? '' ?>">
                        </div>

                        <div class="mb-2 lang-es-field">
                            <label class="form-label small">Descripción (ES)</label>
                            <textarea class="form-control form-control-sm" name="desc_es" rows="2" required><?= $editSlide['descripcion']['es'] ?? '' ?></textarea>
                        </div>
                        <div class="mb-2 lang-en-field">
                            <label class="form-label small">Descripción (EN)</label>
                            <textarea class="form-control form-control-sm" name="desc_en" rows="2"><?= $editSlide['descripcion']['en'] ?? '' ?></textarea>
                        </div>

                        <div class="mb-2 lang-es-field">
                            <label class="form-label small">Texto Botón (ES)</label>
                            <input type="text" class="form-control form-control-sm" name="btn_es" value="<?= $editSlide['btnTexto']['es'] ?? '' ?>" required>
                        </div>
                        <div class="mb-2 lang-en-field">
                            <label class="form-label small">Texto Botón (EN)</label>
                            <input type="text" class="form-control form-control-sm" name="btn_en" value="<?= $editSlide['btnTexto']['en'] ?? '' ?>">
                        </div>

                        <div class="mb-3">
                            <label class="form-label small">Imagen (Opcional, fallback: img/imgFallida.jpg)</label>
                            <input type="file" class="form-control form-control-sm" name="imagen" accept="image/*">
                        </div>

                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-save"></i> Guardar</button>
                            <?php if ($editSlide): ?>
                                <a href="index.php?tab=slides" class="btn btn-secondary btn-sm">Cancelar</a>
                            <?php endif; ?>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-lg-7">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-dark text-white">
                    <h5 class="card-title mb-0">Slides Registrados</h5>
                </div>
                <div class="card-body p-0">
                    <table class="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>
                                    <span class="lang-es-field">Título (ES)</span>
                                    <span class="lang-en-field">Título (EN)</span>
                                </th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($slides as $s): ?>
                            <tr>
                                <td>
                                    <img src="../<?= !empty($s['imagen']) ? $s['imagen'] : 'img/imgFallida.jpg' ?>" 
                                         width="60" height="40" class="rounded object-fit-cover" 
                                         onerror="this.onerror=null; this.src='../img/imgFallida.jpg';">
                                </td>
                                <td>
                                    <strong class="lang-es-field"><?= strip_tags($s['titulo']['es'] ?? '') ?></strong>
                                    <strong class="lang-en-field"><?= strip_tags($s['titulo']['en'] ?? '') ?></strong>
                                </td>
                                <td>
                                    <a href="index.php?tab=slides&edit_slide=<?= $s['id'] ?>" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a>
                                    <a href="eliminar_slide.php?tipo=slide&id=<?= $s['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('¿Eliminar este slide?')"><i class="fas fa-trash"></i></a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <?php else: ?>
    <!-- SECCIÓN DESTINOS -->
    <div class="row g-4">
        <div class="col-lg-5">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-success text-white">
                    <h5 class="card-title mb-0"><?= $editDestino ? 'Editar Destino' : 'Nuevo Destino' ?></h5>
                </div>
                <div class="card-body">
                    <form action="guardar_slide.php" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="tipo" value="destino">
                        <input type="hidden" name="id" value="<?= $editDestino['id'] ?? '' ?>">

                        <div class="mb-2">
                            <label class="form-label small">Título del Destino</label>
                            <input type="text" class="form-control form-control-sm" name="titulo" value="<?= $editDestino['titulo'] ?? '' ?>" required placeholder="Ej: CDMX">
                        </div>

                        <div class="mb-2 lang-es-field">
                            <label class="form-label small">Etiqueta (ES)</label>
                            <input type="text" class="form-control form-control-sm" name="tag_es" value="<?= is_array($editDestino['tag'] ?? null) ? ($editDestino['tag']['es'] ?? '') : ($editDestino['tag'] ?? '') ?>" placeholder="Ej: Modernidad">
                        </div>
                        <div class="mb-2 lang-en-field">
                            <label class="form-label small">Etiqueta (EN)</label>
                            <input type="text" class="form-control form-control-sm" name="tag_en" value="<?= is_array($editDestino['tag'] ?? null) ? ($editDestino['tag']['en'] ?? '') : '' ?>" placeholder="Ej: Modernity">
                        </div>

                        <div class="mb-2 lang-es-field">
                            <label class="form-label small">Info / Atractivos (ES)</label>
                            <input type="text" class="form-control form-control-sm" name="info_es" value="<?= $editDestino['info']['es'] ?? '' ?>">
                        </div>
                        <div class="mb-2 lang-en-field">
                            <label class="form-label small">Info / Atractivos (EN)</label>
                            <input type="text" class="form-control form-control-sm" name="info_en" value="<?= $editDestino['info']['en'] ?? '' ?>">
                        </div>

                        <div class="mb-3">
                            <label class="form-label small">Imagen (Opcional, fallback: img/imgFallida.jpg)</label>
                            <input type="file" class="form-control form-control-sm" name="imagen" accept="image/*">
                        </div>

                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-success btn-sm"><i class="fas fa-save"></i> Guardar Destino</button>
                            <?php if ($editDestino): ?>
                                <a href="index.php?tab=destinos" class="btn btn-secondary btn-sm">Cancelar</a>
                            <?php endif; ?>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-lg-7">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-dark text-white">
                    <h5 class="card-title mb-0">Destinos Registrados</h5>
                </div>
                <div class="card-body p-0">
                    <table class="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Título</th>
                                <th>Tag</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($destinos as $d): ?>
                            <tr>
                                <td>
                                    <img src="../<?= !empty($d['imagen']) ? $d['imagen'] : 'img/imgFallida.jpg' ?>" 
                                         width="60" height="40" class="rounded object-fit-cover" 
                                         onerror="this.onerror=null; this.src='../img/imgFallida.jpg';">
                                </td>
                                <td><strong><?= $d['titulo'] ?></strong></td>
                                <td>
                                    <span class="badge bg-secondary lang-es-field">
                                        <?= is_array($d['tag'] ?? null) ? ($d['tag']['es'] ?? '') : $d['tag'] ?>
                                    </span>
                                    <span class="badge bg-secondary lang-en-field">
                                        <?= is_array($d['tag'] ?? null) ? ($d['tag']['en'] ?? '') : $d['tag'] ?>
                                    </span>
                                </td>
                                <td>
                                    <a href="index.php?tab=destinos&edit_destino=<?= $d['id'] ?>" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a>
                                    <a href="eliminar_slide.php?tipo=destino&id=<?= $d['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('¿Eliminar este destino?')"><i class="fas fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <span class="lang-es-field"><?= is_array($d['info'] ?? null) ? ($d['info']['es'] ?? '') : '' ?></span>
                                    <span class="lang-en-field"><?= is_array($d['info'] ?? null) ? ($d['info']['en'] ?? '') : '' ?></span>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>

</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    function setLanguage(lang) {
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary', 'active');
            } else {
                btn.classList.remove('btn-primary', 'active');
                btn.classList.add('btn-outline-primary');
            }
        });

        const esFields = document.querySelectorAll('.lang-es-field');
        const enFields = document.querySelectorAll('.lang-en-field');

        if (lang === 'es') {
            esFields.forEach(el => el.style.setProperty('display', 'block', 'important'));
            enFields.forEach(el => el.style.setProperty('display', 'none', 'important'));
        } else {
            esFields.forEach(el => el.style.setProperty('display', 'none', 'important'));
            enFields.forEach(el => el.style.setProperty('display', 'block', 'important'));
        }
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    setLanguage('es');
});
</script>
</body>
</html>