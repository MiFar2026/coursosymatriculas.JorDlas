<?php

declare(strict_types=1);

require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder(false, 'Método no permitido.', null, 405);
}

$escuela = trim($_GET['escuela'] ?? '');

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
            h.id AS horario_id,
            h.dia_semana,
            h.hora_inicio,
            h.hora_fin,

            g.id AS grupo_id,
            g.nombre AS grupo,
            g.aula,

            c.nombre AS curso,
            c.idioma,
            c.nivel,

            e.nombre AS escuela,

            p.nombre AS profesor_nombre,
            p.apellidos AS profesor_apellidos

        FROM horarios h

        INNER JOIN grupos g
            ON g.id = h.grupo_id

        INNER JOIN cursos c
            ON c.id = g.curso_id

        INNER JOIN escuelas e
            ON e.id = g.escuela_id

        LEFT JOIN profesores p
            ON p.id = g.profesor_id

        WHERE
            e.nombre = :escuela
            AND e.activa = 1
            AND g.activo = 1
            AND c.activo = 1
            AND h.activo = 1

        ORDER BY
            FIELD(
                h.dia_semana,
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado',
                'Domingo'
            ),
            h.hora_inicio,
            c.nombre
    ";

    $consulta = $pdo->prepare($sql);

    $consulta->execute([
        ':escuela' => $escuela
    ]);

    $horarios = $consulta->fetchAll();

    responder(
        true,
        count($horarios) > 0
            ? 'Horarios encontrados.'
            : 'Todavía no hay horarios publicados para esta escuela.',
        $horarios
    );

} catch (PDOException $e) {
    error_log($e->getMessage());

    responder(
        false,
        'No se pudieron consultar los horarios.',
        null,
        500
    );
}