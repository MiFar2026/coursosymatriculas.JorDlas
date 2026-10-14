<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder(false, 'Método no permitido.', null, 405);
}

try {
    $sql = "
        SELECT id, nombre
        FROM escuelas
        WHERE activa = TRUE
        ORDER BY nombre ASC
    ";

    $stmt = $pdo->query($sql);
    $escuelas = $stmt->fetchAll();

    responder(
        true,
        'Escuelas obtenidas correctamente.',
        $escuelas
    );

} catch (PDOException $e) {

    responder(
        false,
        'Error al obtener las escuelas.',
        null,
        500
    );
}