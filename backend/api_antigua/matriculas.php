<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/config.php';


/*
|--------------------------------------------------------------------------
| SOLO POST
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(
        false,
        'Método no permitido.',
        null,
        405
    );
}


/*
|--------------------------------------------------------------------------
| RECIBIR JSON
|--------------------------------------------------------------------------
*/

$datos = obtenerJson();


/*
|--------------------------------------------------------------------------
| DATOS DEL FORMULARIO
|--------------------------------------------------------------------------
*/

$nombre = trim((string)($datos['nombre'] ?? ''));

$apellidos = trim((string)($datos['apellidos'] ?? ''));

$paisOrigen = trim((string)($datos['pais_origen'] ?? ''));

$email = trim((string)($datos['email'] ?? ''));

$telefono = trim((string)($datos['telefono'] ?? ''));

$escuelaId = isset($datos['escuela_id'])
    ? (int)$datos['escuela_id']
    : 0;

$alumnoAnterior = !empty(
    $datos['alumno_anterior']
);

$solicitaTest = !empty(
    $datos['solicita_test']
);


/*
|--------------------------------------------------------------------------
| NIVELES
|--------------------------------------------------------------------------
|
| El formulario puede enviar:
|
| [
|     "Castellano A1",
|     "Catalán A1"
| ]
|
| Pero nuestra tabla solo tiene un campo
| nivel_solicitado.
|
| Por eso convertimos los niveles seleccionados
| en un texto.
|
*/

$niveles = $datos['niveles'] ?? [];

if (!is_array($niveles)) {
    $niveles = [];
}


/*
|--------------------------------------------------------------------------
| VALIDACIONES BÁSICAS
|--------------------------------------------------------------------------
*/

if ($nombre === '') {

    responder(
        false,
        'El nombre es obligatorio.',
        null,
        400
    );
}


if ($apellidos === '') {

    responder(
        false,
        'Los apellidos son obligatorios.',
        null,
        400
    );
}


if (
    $email === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {

    responder(
        false,
        'El correo electrónico no es válido.',
        null,
        400
    );
}


if ($escuelaId <= 0) {

    responder(
        false,
        'Debes seleccionar una escuela.',
        null,
        400
    );
}


/*
|--------------------------------------------------------------------------
| PREPARAR NIVEL SOLICITADO
|--------------------------------------------------------------------------
*/

$nivelesLimpios = [];

foreach ($niveles as $nivel) {

    $nivel = trim((string)$nivel);

    if ($nivel !== '') {
        $nivelesLimpios[] = $nivel;
    }
}


/*
|--------------------------------------------------------------------------
| Convertimos los niveles en texto
|--------------------------------------------------------------------------
|
| Ejemplo:
|
| Castellano A1, Catalán A1
|
*/

$nivelSolicitado = null;

if (!empty($nivelesLimpios)) {

    $nivelSolicitado = implode(
        ', ',
        $nivelesLimpios
    );
}


/*
|--------------------------------------------------------------------------
| DETERMINAR IDIOMA
|--------------------------------------------------------------------------
*/

$idiomas = [];

foreach ($nivelesLimpios as $nivel) {

    $nivelNormalizado = strtolower($nivel);

    if (
        str_starts_with(
            $nivelNormalizado,
            'castellano'
        )
    ) {

        $idiomas['ES'] = true;
    }


    if (
        str_starts_with(
            $nivelNormalizado,
            'catalan'
        )
        ||
        str_starts_with(
            $nivelNormalizado,
            'catalán'
        )
    ) {

        $idiomas['CA'] = true;
    }
}


$idiomaSolicitado = null;

if (count($idiomas) === 1) {

    $idiomaSolicitado = array_key_first(
        $idiomas
    );
}


/*
|--------------------------------------------------------------------------
| TRANSACCIÓN
|--------------------------------------------------------------------------
*/

try {

    $pdo->beginTransaction();


    /*
    |--------------------------------------------------------------------------
    | COMPROBAR ESCUELA
    |--------------------------------------------------------------------------
    */

    $sqlEscuela = "
        SELECT
            id,
            nombre
        FROM escuelas
        WHERE id = :id
          AND activa = TRUE
        LIMIT 1
    ";

    $stmtEscuela = $pdo->prepare(
        $sqlEscuela
    );

    $stmtEscuela->execute([
        ':id' => $escuelaId
    ]);

    $escuela = $stmtEscuela->fetch();


    if (!$escuela) {

        $pdo->rollBack();

        responder(
            false,
            'La escuela seleccionada no existe o no está activa.',
            null,
            400
        );
    }


    /*
    |--------------------------------------------------------------------------
    | BUSCAR ALUMNO POR EMAIL
    |--------------------------------------------------------------------------
    */

    $sqlAlumno = "
        SELECT
            id
        FROM alumnos
        WHERE email = :email
        LIMIT 1
    ";

    $stmtAlumno = $pdo->prepare(
        $sqlAlumno
    );

    $stmtAlumno->execute([
        ':email' => $email
    ]);

    $alumno = $stmtAlumno->fetch();


    /*
    |--------------------------------------------------------------------------
    | ACTUALIZAR ALUMNO EXISTENTE
    |--------------------------------------------------------------------------
    */

    if ($alumno) {

        $alumnoId = (int)$alumno['id'];


        $sqlActualizar = "
            UPDATE alumnos
            SET
                nombre = :nombre,
                apellidos = :apellidos,
                pais_origen = :pais_origen,
                telefono = :telefono,
                alumno_anterior = :alumno_anterior
            WHERE id = :id
        ";


        $stmtActualizar = $pdo->prepare(
            $sqlActualizar
        );


        $stmtActualizar->execute([

            ':nombre' => $nombre,

            ':apellidos' => $apellidos,

            ':pais_origen' =>
                $paisOrigen !== ''
                    ? $paisOrigen
                    : null,

            ':telefono' =>
                $telefono !== ''
                    ? $telefono
                    : null,

            ':alumno_anterior' =>
                $alumnoAnterior
                    ? 1
                    : 0,

            ':id' => $alumnoId
        ]);

    }


    /*
    |--------------------------------------------------------------------------
    | CREAR ALUMNO NUEVO
    |--------------------------------------------------------------------------
    */

    else {

        $sqlNuevoAlumno = "
            INSERT INTO alumnos (
                nombre,
                apellidos,
                pais_origen,
                email,
                telefono,
                alumno_anterior
            )
            VALUES (
                :nombre,
                :apellidos,
                :pais_origen,
                :email,
                :telefono,
                :alumno_anterior
            )
        ";


        $stmtNuevoAlumno = $pdo->prepare(
            $sqlNuevoAlumno
        );


        $stmtNuevoAlumno->execute([

            ':nombre' => $nombre,

            ':apellidos' => $apellidos,

            ':pais_origen' =>
                $paisOrigen !== ''
                    ? $paisOrigen
                    : null,

            ':email' => $email,

            ':telefono' =>
                $telefono !== ''
                    ? $telefono
                    : null,

            ':alumno_anterior' =>
                $alumnoAnterior
                    ? 1
                    : 0
        ]);


        $alumnoId = (int)$pdo->lastInsertId();
    }


    /*
    |--------------------------------------------------------------------------
    | CREAR SOLICITUD DE MATRÍCULA
    |--------------------------------------------------------------------------
    */

    $sqlSolicitud = "
        INSERT INTO solicitudes_matricula (
            alumno_id,
            escuela_id,
            nivel_solicitado,
            idioma_solicitado,
            solicita_test_nivel,
            estado
        )
        VALUES (
            :alumno_id,
            :escuela_id,
            :nivel_solicitado,
            :idioma_solicitado,
            :solicita_test_nivel,
            'PENDIENTE'
        )
    ";


    $stmtSolicitud = $pdo->prepare(
        $sqlSolicitud
    );


    $stmtSolicitud->execute([

        ':alumno_id' => $alumnoId,

        ':escuela_id' => $escuelaId,

        ':nivel_solicitado' =>
            $nivelSolicitado,

        ':idioma_solicitado' =>
            $idiomaSolicitado,

        ':solicita_test_nivel' =>
            $solicitaTest
                ? 1
                : 0
    ]);


    $solicitudId = (int)$pdo->lastInsertId();


    /*
    |--------------------------------------------------------------------------
    | CONFIRMAR TRANSACCIÓN
    |--------------------------------------------------------------------------
    */

    $pdo->commit();


    /*
    |--------------------------------------------------------------------------
    | RESPUESTA
    |--------------------------------------------------------------------------
    */

    responder(

        true,

        'La solicitud se ha enviado correctamente.',

        [

            'alumno_id' => $alumnoId,

            'solicitud_id' => $solicitudId,

            'escuela' => $escuela['nombre'],

            'nivel_solicitado' =>
                $nivelSolicitado,

            'idioma_solicitado' =>
                $idiomaSolicitado
        ]

    );


} catch (PDOException $e) {


    /*
    |--------------------------------------------------------------------------
    | DESHACER TRANSACCIÓN
    |--------------------------------------------------------------------------
    */

    if ($pdo->inTransaction()) {

        $pdo->rollBack();
    }


    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    responder(

        false,

        'No se pudo guardar la solicitud.',

        null,

        500
    );
}