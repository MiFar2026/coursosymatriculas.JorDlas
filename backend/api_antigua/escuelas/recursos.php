<?php

declare(strict_types=1);

require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder(false, 'Método no permitido.', null, 405);
}

$escuela = trim($_GET['escuela'] ?? '');
$grupoId = filter_var(
    $_GET['grupo_id'] ?? null,
    FILTER_VALIDATE_INT
);

$escuelasPermitidas = [
    'Ateneu Aula 502',
    'Biblioteca Joan Miró'
];

if (!in_array($escuela, $escuelasPermitidas, true)) {
    responder(false, 'La escuela indicada no es válida.', null, 400);
}

try {
    $sql = "
        SELECT
            r.id,
            r.titulo,
            r.descripcion,
            r.nombre_archivo,
            r.ruta_archivo,
            r.tipo,
            r.fecha_publicacion,

            e.nombre AS escuela,

            g.id AS grupo_id,
            g.nombre AS grupo,

            c.nombre AS curso,
            c.idioma,
            c.nivel,

            p.nombre AS profesor_nombre,
            p.apellidos AS profesor_apellidos

        FROM recursos r

        INNER JOIN escuelas e
            ON e.id = r.escuela_id

        INNER JOIN profesores p
            ON p.id = r.profesor_id

        LEFT JOIN grupos g
            ON g.id = r.grupo_id

        LEFT JOIN cursos c
            ON c.id = g.curso_id

        WHERE
            e.nombre = :escuela
            AND e.activa = 1
            AND r.publicado = 1
            AND p.activo = 1
            AND (
                r.grupo_id IS NULL
                OR g.activo = 1
            )
    ";

    $parametros = [
        ':escuela' => $escuela
    ];

    if ($grupoId !== false && $grupoId !== null) {
        $sql .= ' AND r.grupo_id = :grupo_id';

        $parametros[':grupo_id'] = $grupoId;
    }

    $sql .= '
        ORDER BY r.fecha_publicacion DESC, r.id DESC
    ';

    $consulta = $pdo->prepare($sql);
    $consulta->execute($parametros);

    $recursos = $consulta->fetchAll();

    responder(
        true,
        count($recursos) > 0
            ? 'Recursos encontrados.'
            : 'Todavía no hay recursos publicados.',
        $recursos
    );

} catch (PDOException $e) {
    error_log($e->getMessage());

    responder(
        false,
        'No se pudieron consultar los recursos.',
        null,
        500
    );
}