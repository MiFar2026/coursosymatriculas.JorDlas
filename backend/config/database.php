<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN DE BASE DE DATOS
|--------------------------------------------------------------------------
*/

$host = 'localhost';
$dbname = 'BaseDeDatosEscuelas';
$username = 'root';
$password = '';

$charset = 'utf8mb4';

$dsn = "mysql:host={$host};dbname={$dbname};charset={$charset}";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {

    $pdo = new PDO(
        $dsn,
        $username,
        $password,
        $options
    );

} catch (PDOException $e) {

    http_response_code(500);

    header('Content-Type: application/json; charset=utf-8');

    echo json_encode([
        'ok' => false,
        'mensaje' => 'No se pudo conectar con la base de datos.'
    ], JSON_UNESCAPED_UNICODE);

    exit;
}