
-- ============================================================
-- PROYECTO EXAEQUO
-- BASE DE DATOS: exaequo_voluntarios
-- MÓDULO: SOLICITUDES DE VOLUNTARIADO
-- ============================================================


-- ============================================================
-- 1. CREAR LA BASE DE DATOS
-- ============================================================

CREATE DATABASE IF NOT EXISTS exaequo_voluntarios
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;


-- ============================================================
-- 2. SELECCIONAR LA BASE DE DATOS
-- ============================================================

USE exaequo_voluntarios;


-- ============================================================
-- 3. CREAR LA TABLA DE VOLUNTARIOS
-- ============================================================

CREATE TABLE IF NOT EXISTS voluntarios (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nombre VARCHAR(100) NOT NULL,

    apellidos VARCHAR(150) NOT NULL,

    anyo_nacimiento SMALLINT UNSIGNED NOT NULL,

    lugar_residencia VARCHAR(150) NOT NULL,

    documento_identidad VARCHAR(40) NOT NULL,

    telefono VARCHAR(30) NOT NULL,

    email VARCHAR(254) NOT NULL,

    tarea ENUM(
        'profesor',
        'acompanante',
        'comida',
        'mantenimiento',
        'administrativo',
        'esponsor_financiero'
    ) NOT NULL,

    mensaje TEXT NOT NULL,

    privacidad TINYINT(1) NOT NULL DEFAULT 0,

    fecha_solicitud TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_voluntarios_fecha (fecha_solicitud),

    INDEX idx_voluntarios_email (email)

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- 4. CREAR EL USUARIO PARA EL BACKEND
-- ============================================================

CREATE USER IF NOT EXISTS
    'exaequo_voluntarios_app'@'localhost'
    IDENTIFIED BY 'CAMBIA_ESTA_CLAVE_POR_UNA_SEGURA';



-- ============================================================
-- 5. CONCEDER PERMISOS AL USUARIO
-- ============================================================

GRANT SELECT, INSERT, UPDATE
ON exaequo_voluntarios.*
TO 'exaequo_voluntarios_app'@'localhost';


-- ============================================================
-- 6. COMPROBAR QUE LA BASE DE DATOS EXISTE
-- ============================================================

SHOW DATABASES LIKE 'exaequo_voluntarios';


-- ============================================================
-- 7. COMPROBAR QUE LA TABLA EXISTE
-- ============================================================

USE exaequo_voluntarios;

SHOW TABLES;


-- ============================================================
-- 8. COMPROBAR LA ESTRUCTURA DE LA TABLA
-- ============================================================

DESCRIBE voluntarios;


-- ============================================================
-- 9. CONSULTAR LAS SOLICITUDES DE VOLUNTARIADO
-- ============================================================

SELECT
    id,
    nombre,
    apellidos,
    email,
    tarea,
    fecha_solicitud
FROM voluntarios
ORDER BY id DESC;


-- ============================================================
-- 10. COMPROBAR LOS PERMISOS DEL USUARIO
-- ============================================================

SHOW GRANTS FOR
    'exaequo_voluntarios_app'@'localhost';


-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================

ALTER TABLE voluntarios
ADD COLUMN tipo_documento
ENUM('DNI', 'NIE', 'PASAPORTE')
NULL
AFTER documento_identidad;

