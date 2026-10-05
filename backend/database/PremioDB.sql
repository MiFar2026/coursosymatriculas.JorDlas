-- =========================================================
-- BASE DE DATOS DEL PREMIO DE LITERATURA Y POESÍA
-- =========================================================

DROP DATABASE IF EXISTS PremioDB;

CREATE DATABASE PremioDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE PremioDB;


-- =========================================================
-- TABLA: PARTICIPANTES
--
-- Información de la persona que participa.
-- Una persona puede presentar más de una participación.
-- =========================================================

CREATE TABLE participantes (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    apellidos VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL,

    telefono VARCHAR(30),

    pais VARCHAR(100),

    nombre_artistico VARCHAR(150),

    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_participantes_email (email)

);


-- =========================================================
-- TABLA: PARTICIPACIONES
--
-- Información de cada obra presentada.
-- Una persona puede tener varias participaciones.
-- =========================================================

CREATE TABLE participaciones (

    id INT AUTO_INCREMENT PRIMARY KEY,

    participante_id INT NOT NULL,

    codigo_registro CHAR(4) NOT NULL UNIQUE,

    titulo_obra VARCHAR(250) NOT NULL,

    tipo_obra ENUM(
        'Relato',
        'Cuento',
        'Poesía',
        'Novela',
        'Ensayo',
        'Microrrelato',
        'Otro'
    ) NOT NULL,

    genero ENUM(
        'Literatura infantil',
        'Ficción',
        'Poesía',
        'Fantasía',
        'Ciencia ficción',
        'Drama',
        'Comedia',
        'Misterio',
        'Memoria / autobiografía',
        'Ensayo',
        'Otro'
    ),

    idioma ENUM(
        'Castellano',
        'Catalán',
        'Persa',
        'Inglés',
        'Francés',
        'Otro'
    ) NOT NULL,

    numero_palabras INT,

    sinopsis TEXT,

    comentarios TEXT,

    nombre_archivo VARCHAR(255) NOT NULL,

    ruta_archivo VARCHAR(500) NOT NULL,

    tipo_archivo VARCHAR(100) NOT NULL,

    tamano_archivo INT UNSIGNED NOT NULL,

    acepta_bases BOOLEAN NOT NULL DEFAULT FALSE,

    declara_autoria BOOLEAN NOT NULL DEFAULT FALSE,

    estado ENUM(
        'Recibida',
        'En revisión',
        'Aceptada',
        'Rechazada',
        'Ganadora'
    ) NOT NULL DEFAULT 'Recibida',

    fecha_participacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_participacion_participante

        FOREIGN KEY (participante_id)

        REFERENCES participantes(id)

        ON DELETE RESTRICT

        ON UPDATE CASCADE,


    INDEX idx_participaciones_participante (
        participante_id
    ),

    INDEX idx_participaciones_codigo (
        codigo_registro
    ),

    INDEX idx_participaciones_estado (
        estado
    ),

    INDEX idx_participaciones_fecha (
        fecha_participacion
    )

);


-- =========================================================
-- VERIFICACIÓN
-- =========================================================

SELECT * FROM participantes;

SELECT * FROM participaciones;


-- =========================================================
-- CONSULTA PARA VER PARTICIPACIONES COMPLETAS
-- =========================================================

SELECT

    p.id AS participante_id,

    p.nombre,

    p.apellidos,

    p.email,

    p.telefono,

    p.pais,

    p.nombre_artistico,

    pa.id AS participacion_id,

    pa.codigo_registro,

    pa.titulo_obra,

    pa.tipo_obra,

    pa.genero,

    pa.idioma,

    pa.numero_palabras,

    pa.sinopsis,

    pa.comentarios,

    pa.nombre_archivo,

    pa.ruta_archivo,

    pa.tipo_archivo,

    pa.tamano_archivo,

    pa.acepta_bases,

    pa.declara_autoria,

    pa.estado,

    pa.fecha_participacion

FROM participantes p

INNER JOIN participaciones pa

    ON p.id = pa.participante_id

ORDER BY pa.fecha_participacion DESC;