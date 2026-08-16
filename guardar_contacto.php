<?php
$servername = "localhost";
$username = "webselfe_bas";
$password = "Dumbos2405$";
$dbname = "webselfe_contactos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (
    isset($_POST['name']) && isset($_POST['email']) &&
    isset($_POST['telefono']) && isset($_POST['message'])
) {
    // 1. Validar Honeypot: Si el campo oculto contiene texto, es un bot
    if (!empty($_POST['website'])) {
        // Simulamos éxito para no alertar al bot
        echo "<script>alert('¡Gracias! Su mensaje ha sido enviado con éxito.'); window.location.href='index.html';</script>";
        exit;
    }

    // 2. Validar tiempo de envío (mínimo 3 segundos)
    $formTime = isset($_POST['form_time']) ? (int)$_POST['form_time'] : 0;
    if ((time() - $formTime) < 3) {
        echo "<script>alert('¡Gracias! Su mensaje ha sido enviado con éxito.'); window.location.href='index.html';</script>";
        exit;
    }

    $nombre = trim($_POST['name']);
    $email = trim($_POST['email']);
    $telefono = trim($_POST['telefono']);
    $mensaje = trim($_POST['message']);
    $sistema = 'YucatanWorld';

    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo "<script>alert('Por favor completa todos los campos requeridos.'); window.history.back();</script>";
        exit;
    }

    // 3. Filtro básico de spam (textos sin sentido o enlaces innecesarios)
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        echo "<script>alert('Dirección de correo no válida.'); window.history.back();</script>";
        exit;
    }

    $sql = "INSERT INTO contactos (nombre, email, telefono, sistema, mensaje) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("sssss", $nombre, $email, $telefono, $sistema, $mensaje);
        if ($stmt->execute()) {
            echo "<script>alert('¡Gracias! Su mensaje ha sido enviado con éxito.'); window.location.href='index.html';</script>";
        } else {
            echo "<script>alert('Error al guardar el mensaje.'); window.history.back();</script>";
        }
        $stmt->close();
    } else {
        echo "<script>alert('Error en la preparación de la consulta.'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('Formulario incompleto.'); window.history.back();</script>";
}

$conn->close();
?>