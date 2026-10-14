<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder(false, 'Método no permitido.', null, 405);
}

try {
    $sql = "
        SELECT 
            id,
            nombre,
            idioma,
            nivel
        FROM cursos
        WHERE activo = TRUE
        ORDER BY idioma ASC, nivel ASC
    ";

    $stmt = $pdo->query($sql);
    $cursos = $stmt->fetchAll();

    responder(
        true,
        'Cursos obtenidos correctamente.',
        $cursos
    );

} catch (PDOException $e) {

    responder(
        false,
        'Error al obtener los cursos.',
        null,
        500
    );
}