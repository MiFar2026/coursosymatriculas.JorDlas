
CREATE DATABASE IF NOT EXISTS exaequo_voluntarios
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'exaequo_voluntarios_app'@'localhost'
  IDENTIFIED BY 'root';

GRANT SELECT, INSERT
  ON exaequo_voluntarios.*
  TO 'exaequo_voluntarios_app'@'localhost';


USE exaequo_voluntarios;

SELECT id, nombre, apellidos, email, tarea, fecha_solicitud
FROM voluntarios
ORDER BY id DESC;


USE exaequo_voluntarios;

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
    fecha_solicitud TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_voluntarios_fecha (fecha_solicitud),
    INDEX idx_voluntarios_email (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


SHOW TABLES;

DESCRIBE voluntarios;


ALTER USER 'exaequo_voluntarios_app'@'localhost'
IDENTIFIED BY 'root';


SELECT id, nombre, apellidos, email, tarea, fecha_solicitud
FROM voluntarios
ORDER BY id DESC;