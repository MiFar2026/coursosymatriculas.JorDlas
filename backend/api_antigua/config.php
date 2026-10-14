<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN COMÚN DE LA API
|--------------------------------------------------------------------------
*/

header('Content-Type: application/json; charset=utf-8');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


function responder(
    bool $ok,
    string $mensaje = '',
    mixed $datos = null,
    int $codigo = 200
): never {

    http_response_code($codigo);

    echo json_encode([
        'ok' => $ok,
        'mensaje' => $mensaje,
        'datos' => $datos
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


function obtenerJson(): array
{
    $contenido = file_get_contents('php://input');

    if (!$contenido) {
        responder(
            false,
            'No se recibieron datos.',
            null,
            400
        );
    }

    $datos = json_decode($contenido, true);

    if (!is_array($datos)) {
        responder(
            false,
            'Los datos recibidos no tienen un formato JSON válido.',
            null,
            400
        );
    }

    return $datos;
}