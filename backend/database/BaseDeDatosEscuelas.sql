-- ============================================================
-- BASE DE DATOS COMPLETA PARA LAS DOS ESCUELAS
-- ============================================================

-- DROP DATABASE IF EXISTS BaseDeDatosEscuelas;

CREATE DATABASE BaseDeDatosEscuelas
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE BaseDeDatosEscuelas;


-- ============================================================
-- 1. ESCUELAS
-- ============================================================

CREATE TABLE escuelas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(150) NOT NULL,

    activa BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (nombre)
) ENGINE=InnoDB;

-- ============================================================
-- 2. PROFESORES
-- Compatible con adminProfesoresController.js y el historial
-- ============================================================

CREATE TABLE profesores (
    id INT AUTO_INCREMENT PRIMARY KEY,

    tipo_documento ENUM(
        'DNI',
        'NIE',
        'PASAPORTE'
    ) NOT NULL,

    documento VARCHAR(30) NOT NULL,

    nombre VARCHAR(100) NOT NULL,

    apellidos VARCHAR(100) NOT NULL,

    anio_nacimiento SMALLINT UNSIGNED NULL,

    telefono VARCHAR(30) NULL,

    email VARCHAR(150) NULL,

    especialidad VARCHAR(100) NULL,

    foto VARCHAR(255) NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uq_profesores_documento (documento),

    UNIQUE KEY uq_profesores_email (email),

    CONSTRAINT chk_profesores_anio
        CHECK (
            anio_nacimiento IS NULL
            OR anio_nacimiento BETWEEN 1900 AND 2100
        ),

    CONSTRAINT chk_profesores_email
        CHECK (
            email IS NULL
            OR email <> ''
        )
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. ALUMNOS
-- ============================================================

CREATE TABLE alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    tipo_documento ENUM(
        'DNI',
        'NIE',
        'PASAPORTE'
    ) NULL,

    documento VARCHAR(30) NULL,

    nombre VARCHAR(100) NOT NULL,

    apellidos VARCHAR(100) NOT NULL,

    pais_origen VARCHAR(100),

    telefono VARCHAR(30),

    email VARCHAR(150),

    fecha_nacimiento DATE NULL,

    alumno_anterior BOOLEAN NOT NULL DEFAULT FALSE,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE (documento),

    CHECK (
        tipo_documento IS NULL
        OR documento IS NOT NULL
    )
) ENGINE=InnoDB;


-- ============================================================
-- 4. CURSOS
-- ============================================================

CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    idioma ENUM(
        'Castellano',
        'Catalán',
        'Alfabetización'
    ) NOT NULL,

    nivel VARCHAR(20) NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (nombre)
) ENGINE=InnoDB;

ALTER TABLE recursos
ADD COLUMN eliminado_profesor TINYINT(1) NOT NULL DEFAULT 0
AFTER publicado;

-- ============================================================
-- 5. GRUPOS
-- ============================================================

CREATE TABLE grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    curso_id INT NOT NULL,

    escuela_id INT NOT NULL,

    profesor_id INT NULL,

    nombre VARCHAR(100) NOT NULL,

    aula VARCHAR(50),

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_grupos_curso
        FOREIGN KEY (curso_id)
        REFERENCES cursos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_grupos_escuela
        FOREIGN KEY (escuela_id)
        REFERENCES escuelas(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_grupos_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 6. HORARIOS
-- ============================================================

CREATE TABLE horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,

    grupo_id INT NOT NULL,

    dia_semana ENUM(
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo'
    ) NOT NULL,

    hora_inicio TIME NOT NULL,

    hora_fin TIME NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_horarios_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CHECK (hora_inicio < hora_fin)
) ENGINE=InnoDB;


-- ============================================================
-- 7. SOLICITUDES DE MATRÍCULA
-- ============================================================

CREATE TABLE solicitudes_matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,

    alumno_id INT NOT NULL,

    escuela_id INT NOT NULL,

    nivel_solicitado VARCHAR(100),

    idioma_solicitado ENUM(
        'ES',
        'CA'
    ) NULL,

    solicita_test_nivel BOOLEAN NOT NULL DEFAULT FALSE,

    estado ENUM(
        'PENDIENTE',
        'EN_REVISION',
        'ACEPTADA',
        'RECHAZADA',
        'CANCELADA'
    ) NOT NULL DEFAULT 'PENDIENTE',

    observaciones TEXT NULL,

    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_solicitudes_alumno
        FOREIGN KEY (alumno_id)
        REFERENCES alumnos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_solicitudes_escuela
        FOREIGN KEY (escuela_id)
        REFERENCES escuelas(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- 8. MATRÍCULAS
-- ============================================================

CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    alumno_id INT NOT NULL,

    grupo_id INT NOT NULL,

    fecha_matricula DATE NOT NULL,

    estado ENUM(
        'ACTIVA',
        'BAJA',
        'FINALIZADA'
    ) NOT NULL DEFAULT 'ACTIVA',

    fecha_baja DATE NULL,

    observaciones TEXT NULL,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_matriculas_alumno
        FOREIGN KEY (alumno_id)
        REFERENCES alumnos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_matriculas_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    UNIQUE (alumno_id, grupo_id)
) ENGINE=InnoDB;


-- ============================================================
-- 9. TAREAS / ENTREGAS DE LOS ALUMNOS
-- ============================================================

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    alumno_id INT NOT NULL,

    grupo_id INT NOT NULL,

    profesor_id INT NULL,

    titulo VARCHAR(200) NOT NULL,

    comentario TEXT NULL,

    nombre_archivo VARCHAR(255) NULL,

    ruta_archivo VARCHAR(500) NULL,

    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    estado ENUM(
        'ENVIADA',
        'REVISADA',
        'DEVUELTA'
    ) NOT NULL DEFAULT 'ENVIADA',

    CONSTRAINT fk_tareas_alumno
        FOREIGN KEY (alumno_id)
        REFERENCES alumnos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_tareas_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_tareas_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 10. MENSAJES PRIVADOS
-- ============================================================

CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,

    alumno_id INT NOT NULL,

    profesor_id INT NOT NULL,

    grupo_id INT NOT NULL,

    asunto VARCHAR(200) NOT NULL,

    mensaje TEXT NOT NULL,

    remitente ENUM(
        'ALUMNO',
        'PROFESOR'
    ) NOT NULL,

    leido BOOLEAN NOT NULL DEFAULT FALSE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_mensajes_alumno
        FOREIGN KEY (alumno_id)
        REFERENCES alumnos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_mensajes_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_mensajes_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- 11. RESULTADOS / NOTAS
-- ============================================================

CREATE TABLE resultados (
    id INT AUTO_INCREMENT PRIMARY KEY,

    alumno_id INT NOT NULL,

    grupo_id INT NOT NULL,

    profesor_id INT NULL,

    tipo ENUM(
        'EXAMEN',
        'TAREA',
        'ACTIVIDAD',
        'PARTICIPACION',
        'FINAL'
    ) NOT NULL,

    titulo VARCHAR(200) NOT NULL,

    nota DECIMAL(5,2) NULL,

    comentario TEXT NULL,

    fecha_resultado DATE NULL,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_resultados_alumno
        FOREIGN KEY (alumno_id)
        REFERENCES alumnos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_resultados_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_resultados_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CHECK (
        nota IS NULL
        OR (nota >= 0 AND nota <= 10)
    )
) ENGINE=InnoDB;


-- ============================================================
-- 12. AVISOS DE CLASE
-- ============================================================

CREATE TABLE avisos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    grupo_id INT NOT NULL,

    profesor_id INT NULL,

    titulo VARCHAR(200) NOT NULL,

    mensaje TEXT NOT NULL,

    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_avisos_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_avisos_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 13. FORO DE ESTUDIANTES
-- ============================================================

CREATE TABLE foro_mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,

    grupo_id INT NOT NULL,

    alumno_id INT NULL,

    profesor_id INT NULL,

    mensaje TEXT NOT NULL,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_foro_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_foro_alumno
        FOREIGN KEY (alumno_id)
        REFERENCES alumnos(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_foro_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 14. ESCUELAS INICIALES
-- ============================================================

INSERT INTO escuelas (
    nombre,
    activa
)
VALUES
(
    'Biblioteca Joan Miró',
    TRUE
),
(
    'Ateneu Aula 502',
    TRUE
);


-- ============================================================
-- 15. CURSOS INICIALES
-- ============================================================

INSERT INTO cursos (
    nombre,
    idioma,
    nivel,
    activo
)
VALUES
(
    'Castellano A1',
    'Castellano',
    'A1',
    TRUE
),
(
    'Castellano A2',
    'Castellano',
    'A2',
    TRUE
),
(
    'Castellano B1',
    'Castellano',
    'B1',
    TRUE
),
(
    'Catalán A1',
    'Catalán',
    'A1',
    TRUE
),
(
    'Catalán A2',
    'Catalán',
    'A2',
    TRUE
),
(
    'Catalán B2',
    'Catalán',
    'B2',
    TRUE
),
(
    'Alfabetización',
    'Alfabetización',
    'General',
    TRUE
);


-- ============================================================
-- 16. RECURSOS / MATERIALES DE CLASE
-- ============================================================

USE BaseDeDatosEscuelas;

CREATE TABLE IF NOT EXISTS recursos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    escuela_id INT NOT NULL,

    grupo_id INT NULL,

    profesor_id INT NOT NULL,

    titulo VARCHAR(200) NOT NULL,

    descripcion TEXT NULL,

    nombre_archivo VARCHAR(255) NOT NULL,

    ruta_archivo VARCHAR(500) NOT NULL,

    tipo ENUM(
        'PDF',
        'DOCUMENTO',
        'IMAGEN',
        'AUDIO',
        'VIDEO',
        'OTRO'
    ) NOT NULL DEFAULT 'OTRO',

    publicado TINYINT(1) NOT NULL DEFAULT 1,

    fecha_publicacion TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_recursos_escuela
        FOREIGN KEY (escuela_id)
        REFERENCES escuelas(id),

    CONSTRAINT fk_recursos_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_recursos_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id),

    INDEX idx_recursos_escuela (escuela_id),

    INDEX idx_recursos_grupo (grupo_id),

    INDEX idx_recursos_publicados (
        escuela_id,
        publicado,
        fecha_publicacion
    )
);

-- ============================================================
--  17. FORO DE PROFESORES
-- ============================================================


USE BaseDeDatosEscuelas;

CREATE TABLE IF NOT EXISTS foro_profesores (
    id INT AUTO_INCREMENT PRIMARY KEY,

    escuela_id INT NOT NULL,

    profesor_id INT NOT NULL,

    titulo VARCHAR(200) NOT NULL,

    mensaje TEXT NOT NULL,

    fecha_creacion TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    activo TINYINT(1) NOT NULL DEFAULT 1,

    CONSTRAINT fk_foro_profesores_escuela
        FOREIGN KEY (escuela_id)
        REFERENCES escuelas(id),

    CONSTRAINT fk_foro_profesores_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id),

    INDEX idx_foro_profesores_escuela_fecha (
        escuela_id,
        fecha_creacion
    )
);

-- ============================================================
--  ÍNDICES
-- ============================================================

CREATE INDEX idx_grupos_curso
ON grupos(curso_id);

CREATE INDEX idx_grupos_escuela
ON grupos(escuela_id);

CREATE INDEX idx_grupos_profesor
ON grupos(profesor_id);

CREATE INDEX idx_grupos_activo
ON grupos(activo);

CREATE INDEX idx_horarios_grupo
ON horarios(grupo_id);

CREATE INDEX idx_horarios_dia
ON horarios(dia_semana);

CREATE INDEX idx_horarios_activo
ON horarios(activo);

CREATE INDEX idx_alumnos_nombre
ON alumnos(apellidos, nombre);

CREATE INDEX idx_alumnos_email
ON alumnos(email);

CREATE INDEX idx_solicitudes_alumno
ON solicitudes_matricula(alumno_id);

CREATE INDEX idx_solicitudes_escuela
ON solicitudes_matricula(escuela_id);

CREATE INDEX idx_solicitudes_estado
ON solicitudes_matricula(estado);

CREATE INDEX idx_matriculas_alumno
ON matriculas(alumno_id);

CREATE INDEX idx_matriculas_grupo
ON matriculas(grupo_id);

CREATE INDEX idx_matriculas_estado
ON matriculas(estado);

CREATE INDEX idx_tareas_alumno
ON tareas(alumno_id);

CREATE INDEX idx_tareas_grupo
ON tareas(grupo_id);

CREATE INDEX idx_tareas_profesor
ON tareas(profesor_id);

CREATE INDEX idx_tareas_fecha
ON tareas(fecha_envio);

CREATE INDEX idx_mensajes_alumno
ON mensajes(alumno_id);

CREATE INDEX idx_mensajes_profesor
ON mensajes(profesor_id);

CREATE INDEX idx_mensajes_grupo
ON mensajes(grupo_id);

CREATE INDEX idx_mensajes_fecha
ON mensajes(fecha_creacion);

CREATE INDEX idx_resultados_alumno
ON resultados(alumno_id);

CREATE INDEX idx_resultados_grupo
ON resultados(grupo_id);

CREATE INDEX idx_resultados_profesor
ON resultados(profesor_id);

CREATE INDEX idx_avisos_grupo
ON avisos(grupo_id);

CREATE INDEX idx_avisos_profesor
ON avisos(profesor_id);

CREATE INDEX idx_foro_grupo
ON foro_mensajes(grupo_id);

CREATE INDEX idx_foro_fecha
ON foro_mensajes(fecha_creacion);


ALTER TABLE avisos
ADD COLUMN tipo ENUM('PERMANENTE', 'DIARIO')
NOT NULL DEFAULT 'DIARIO'
AFTER mensaje;

ALTER TABLE avisos
ADD COLUMN fecha_expiracion DATETIME NULL
AFTER fecha_publicacion;


ALTER TABLE tareas
ADD COLUMN nombre_archivo_corregido VARCHAR(255) NULL
AFTER ruta_archivo;

ALTER TABLE tareas
ADD COLUMN ruta_archivo_corregido VARCHAR(500) NULL
AFTER nombre_archivo_corregido;

ALTER TABLE tareas
ADD COLUMN comentario_profesor TEXT NULL
AFTER ruta_archivo_corregido;

ALTER TABLE tareas
ADD COLUMN fecha_revision DATETIME NULL
AFTER comentario_profesor;



-- ============================================================
-- COMPROBACIÓN
-- ============================================================

SELECT * FROM escuelas;

SELECT * FROM cursos;

SELECT * FROM profesores;

SELECT * FROM alumnos;

SELECT * FROM grupos;

SELECT * FROM horarios;

SELECT * FROM solicitudes_matricula;

SELECT * FROM matriculas;

SELECT * FROM tareas;

SELECT * FROM mensajes;

SELECT * FROM resultados;

SELECT * FROM avisos;

SELECT * FROM foro_mensajes;


UPDATE cursos
SET nombre = 'Catalán B1',
    nivel = 'B1'
WHERE id = 6
  AND idioma = 'Catalán'
  AND nivel = 'B2';
  
  
  
  ALTER TABLE grupos
ADD COLUMN turno ENUM('Mañana', 'Tarde') NULL
AFTER nombre;


START TRANSACTION;

-- Reutilizar el grupo existente como Castellano A1 de mañana
UPDATE grupos
SET nombre = 'Castellano A1 - Mañana',
    turno = 'Mañana'
WHERE id = 1
  AND curso_id = 1
  AND escuela_id = 2;

-- Crear las combinaciones que todavía no existen
INSERT INTO grupos (
    curso_id,
    escuela_id,
    profesor_id,
    nombre,
    turno,
    aula,
    activo
)
SELECT
    c.id,
    e.id,
    NULL,
    CASE
        WHEN c.idioma = 'Alfabetización'
            THEN CONCAT('Alfabetización - ', t.turno)
        ELSE CONCAT(c.idioma, ' ', c.nivel, ' - ', t.turno)
    END,
    t.turno,
    NULL,
    1
FROM cursos c
CROSS JOIN escuelas e
CROSS JOIN (
    SELECT 'Mañana' AS turno
    UNION ALL
    SELECT 'Tarde' AS turno
) t
WHERE c.activo = 1
  AND e.activa = 1
  AND NOT EXISTS (
      SELECT 1
      FROM grupos g
      WHERE g.curso_id = c.id
        AND g.escuela_id = e.id
        AND g.turno = t.turno
  );

COMMIT;


CREATE TABLE IF NOT EXISTS profesores_historial (
    historial_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    profesor_id INT NOT NULL,

    accion ENUM(
        'INICIAL',
        'MODIFICACION',
        'ELIMINACION'
    ) NOT NULL,

    fecha_cambio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    usuario_mysql VARCHAR(150),

    datos_anteriores JSON NULL,
    datos_nuevos JSON NULL,

    INDEX idx_profesor_historial (profesor_id),
    INDEX idx_fecha_historial (fecha_cambio)
);


USE BaseDeDatosEscuelas;

DELIMITER $$

CREATE TRIGGER profesores_historial_update
AFTER UPDATE ON profesores
FOR EACH ROW
BEGIN
    INSERT INTO profesores_historial (
        profesor_id,
        accion,
        usuario_mysql,
        datos_anteriores,
        datos_nuevos
    )
    VALUES (
        OLD.id,
        'MODIFICACION',
        CURRENT_USER(),

        JSON_OBJECT(
            'tipo_documento', OLD.tipo_documento,
            'documento', OLD.documento,
            'nombre', OLD.nombre,
            'apellidos', OLD.apellidos,
            'anio_nacimiento', OLD.anio_nacimiento,
            'telefono', OLD.telefono,
            'email', OLD.email,
            'especialidad', OLD.especialidad,
            'activo', OLD.activo,
            'fecha_creacion', OLD.fecha_creacion
        ),

        JSON_OBJECT(
            'tipo_documento', NEW.tipo_documento,
            'documento', NEW.documento,
            'nombre', NEW.nombre,
            'apellidos', NEW.apellidos,
            'anio_nacimiento', NEW.anio_nacimiento,
            'telefono', NEW.telefono,
            'email', NEW.email,
            'especialidad', NEW.especialidad,
            'activo', NEW.activo,
            'fecha_creacion', NEW.fecha_creacion
        )
    );
END$$

CREATE TRIGGER profesores_historial_delete
BEFORE DELETE ON profesores
FOR EACH ROW
BEGIN
    INSERT INTO profesores_historial (
        profesor_id,
        accion,
        usuario_mysql,
        datos_anteriores,
        datos_nuevos
    )
    VALUES (
        OLD.id,
        'ELIMINACION',
        CURRENT_USER(),

        JSON_OBJECT(
            'tipo_documento', OLD.tipo_documento,
            'documento', OLD.documento,
            'nombre', OLD.nombre,
            'apellidos', OLD.apellidos,
            'anio_nacimiento', OLD.anio_nacimiento,
            'telefono', OLD.telefono,
            'email', OLD.email,
            'especialidad', OLD.especialidad,
            'activo', OLD.activo,
            'fecha_creacion', OLD.fecha_creacion
        ),

        NULL
    );
END$$

DELIMITER ;


INSERT INTO profesores_historial (
    profesor_id,
    accion,
    usuario_mysql,
    datos_anteriores,
    datos_nuevos
)
SELECT
    p.id,
    'INICIAL',
    CURRENT_USER(),
    NULL,
    JSON_OBJECT(
        'tipo_documento', p.tipo_documento,
        'documento', p.documento,
        'nombre', p.nombre,
        'apellidos', p.apellidos,
        'anio_nacimiento', p.anio_nacimiento,
        'telefono', p.telefono,
        'email', p.email,
        'especialidad', p.especialidad,
        'activo', p.activo,
        'fecha_creacion', p.fecha_creacion
    )
FROM profesores AS p;



-- 1. Actividades publicadas por los profesores
CREATE TABLE actividades (
    id INT NOT NULL AUTO_INCREMENT,
    escuela_id INT NOT NULL,
    grupo_id INT NOT NULL,
    profesor_id INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT DEFAULT NULL,
    fecha_entrega DATETIME DEFAULT NULL,
    publicado TINYINT(1) NOT NULL DEFAULT 1,
    fecha_publicacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY idx_actividades_escuela (escuela_id),
    KEY idx_actividades_grupo (grupo_id),
    KEY idx_actividades_profesor (profesor_id),
    KEY idx_actividades_publicadas (grupo_id, publicado),

    CONSTRAINT fk_actividades_escuela
        FOREIGN KEY (escuela_id)
        REFERENCES escuelas(id),

    CONSTRAINT fk_actividades_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id),

    CONSTRAINT fk_actividades_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- 2. Vincular las entregas con la actividad publicada
-- La columna admite NULL para conservar las entregas antiguas.
ALTER TABLE tareas
    ADD COLUMN actividad_id INT DEFAULT NULL,
    ADD KEY idx_tareas_actividad (actividad_id),
    ADD CONSTRAINT fk_tareas_actividad
        FOREIGN KEY (actividad_id)
        REFERENCES actividades(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE;


-- 3. Vincular los resultados con la actividad correspondiente
-- Se mantiene la estructura de las notas existentes.
ALTER TABLE resultados
    ADD COLUMN actividad_id INT DEFAULT NULL,
    ADD KEY idx_resultados_actividad (actividad_id),
    ADD CONSTRAINT fk_resultados_actividad
        FOREIGN KEY (actividad_id)
        REFERENCES actividades(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE;


-- 4. Permitir recursos con archivo, enlace o ambos
ALTER TABLE recursos
    MODIFY COLUMN nombre_archivo VARCHAR(255) DEFAULT NULL,
    MODIFY COLUMN ruta_archivo VARCHAR(500) DEFAULT NULL,
    ADD COLUMN url VARCHAR(2048) DEFAULT NULL;



USE BaseDeDatosEscuelas;

ALTER TABLE resultados
    ADD COLUMN archivo_corregido VARCHAR(255) NULL,
    ADD COLUMN nombre_archivo_corregido VARCHAR(255) NULL;
    
    
    ALTER TABLE resultados
ADD COLUMN decision_apto ENUM('APTO', 'NO_APTO') NULL;


UPDATE resultados
SET decision_apto = CASE
  WHEN nota >= 5 THEN 'APTO'
  ELSE 'NO_APTO'
END
WHERE id = 3
  AND tipo = 'FINAL';
  
  
  ALTER TABLE resultados
ADD COLUMN estado_certificado
ENUM('PENDIENTE', 'EMITIDO', 'ENTREGADO')
NOT NULL DEFAULT 'PENDIENTE';

UPDATE resultados
SET decision_apto = 'APTO'
WHERE id = 6
  AND tipo = 'FINAL'
  AND nota >= 6
  AND decision_apto IS NULL;
  
  
  
  
USE BaseDeDatosEscuelas;

-- 1. Una sesión de clase por fecha y horario.
CREATE TABLE IF NOT EXISTS asistencia_sesiones (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    grupo_id INT NOT NULL,
    horario_id INT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('REALIZADA', 'CANCELADA')
        NOT NULL DEFAULT 'REALIZADA',
    creado_por INT NULL,
    actualizado_por INT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_asistencia_horario_fecha (horario_id, fecha),
    INDEX idx_asistencia_grupo_fecha (grupo_id, fecha)
);

-- 2. Asistencia individual de cada alumno a cada sesión.
CREATE TABLE IF NOT EXISTS asistencia_registros (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sesion_id INT NOT NULL,
    alumno_id INT NOT NULL,
    estado ENUM('PRESENTE', 'AUSENTE', 'PARCIAL')
        NOT NULL DEFAULT 'AUSENTE',
    minutos_asistidos INT UNSIGNED NOT NULL DEFAULT 0,
    registrado_por INT NOT NULL,
    actualizado_por INT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_asistencia_alumno_sesion (sesion_id, alumno_id),
    INDEX idx_asistencia_alumno (alumno_id),
    INDEX idx_asistencia_sesion (sesion_id)
);

-- 3. Historial de rectificaciones.
CREATE TABLE IF NOT EXISTS asistencia_historial (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    asistencia_id INT NOT NULL,
    estado_anterior VARCHAR(20) NULL,
    estado_nuevo VARCHAR(20) NOT NULL,
    minutos_anteriores INT UNSIGNED NULL,
    minutos_nuevos INT UNSIGNED NOT NULL,
    profesor_id INT NOT NULL,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_historial_asistencia (asistencia_id)
);

SHOW TABLES;


-- =====================================================
-- 1. MENSAJES PRIVADOS ENTRE ALUMNO Y PROFESOR
-- =====================================================

CREATE TABLE IF NOT EXISTS mensajes_privados (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    escuela_id INT NOT NULL,
    grupo_id INT NOT NULL,
    alumno_id INT NOT NULL,
    profesor_id INT NOT NULL,

    remitente_tipo ENUM('ALUMNO', 'PROFESOR') NOT NULL,
    remitente_id INT NOT NULL,

    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    estado ENUM('VISIBLE', 'RETIRADO') NOT NULL DEFAULT 'VISIBLE',

    PRIMARY KEY (id),

    INDEX idx_mensajes_conversacion (
        escuela_id,
        grupo_id,
        alumno_id,
        profesor_id,
        id
    ),

    INDEX idx_mensajes_reportables (estado, id)
);


-- =====================================================
-- 2. REPORTES DE MENSAJES
-- Un mensaje puede tener varios reportes.
-- =====================================================

CREATE TABLE IF NOT EXISTS reportes_mensajes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    mensaje_id BIGINT UNSIGNED NOT NULL,

    reportante_tipo ENUM('ALUMNO', 'PROFESOR') NOT NULL,
    reportante_id INT NOT NULL,

    motivo VARCHAR(150) NOT NULL,
    comentario TEXT NULL,

    estado ENUM(
        'PENDIENTE',
        'REVISADO',
        'RETIRADO'
    ) NOT NULL DEFAULT 'PENDIENTE',

    fecha_reporte TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_revision TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY (id),

    INDEX idx_reportes_estado_fecha (estado, fecha_reporte),
    INDEX idx_reportes_mensaje (mensaje_id),

    CONSTRAINT fk_reportes_mensajes
        FOREIGN KEY (mensaje_id)
        REFERENCES mensajes_privados(id)
        ON DELETE RESTRICT
);


-- =====================================================
-- 3. HISTORIAL DE MODERACIÓN
-- Conserva las decisiones administrativas.
-- =====================================================

CREATE TABLE IF NOT EXISTS mensajes_moderacion_auditoria (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    mensaje_id BIGINT UNSIGNED NOT NULL,
    reporte_id BIGINT UNSIGNED NULL,

    accion ENUM(
        'REVISION',
        'RETIRADA'
    ) NOT NULL,

    administrador_id INT NULL,
    detalle VARCHAR(1000) NULL,

    fecha_accion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_auditoria_mensaje (mensaje_id, fecha_accion),

    CONSTRAINT fk_auditoria_mensaje
        FOREIGN KEY (mensaje_id)
        REFERENCES mensajes_privados(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_auditoria_reporte
        FOREIGN KEY (reporte_id)
        REFERENCES reportes_mensajes(id)
        ON DELETE RESTRICT
);


-- 1. Mensajes privados
CREATE TABLE IF NOT EXISTS mensajes_privados (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    escuela_id INT NOT NULL,
    grupo_id INT NOT NULL,
    alumno_id INT NOT NULL,
    profesor_id INT NOT NULL,
    remitente_tipo ENUM('ALUMNO', 'PROFESOR') NOT NULL,
    remitente_id INT NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('VISIBLE', 'RETIRADO') NOT NULL DEFAULT 'VISIBLE',

    PRIMARY KEY (id),

    INDEX idx_mensajes_conversacion (
        escuela_id,
        grupo_id,
        alumno_id,
        profesor_id,
        id
    ),

    INDEX idx_mensajes_reportables (estado, id)
);

-- 2. Reportes de mensajes
CREATE TABLE IF NOT EXISTS reportes_mensajes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    mensaje_id BIGINT UNSIGNED NOT NULL,
    reportante_tipo ENUM('ALUMNO', 'PROFESOR') NOT NULL,
    reportante_id INT NOT NULL,
    motivo VARCHAR(150) NOT NULL,
    comentario TEXT NULL,
    estado ENUM(
        'PENDIENTE',
        'REVISADO',
        'RETIRADO'
    ) NOT NULL DEFAULT 'PENDIENTE',
    fecha_reporte TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_revision TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY (id),

    INDEX idx_reportes_estado_fecha (estado, fecha_reporte),
    INDEX idx_reportes_mensaje (mensaje_id),

    CONSTRAINT fk_reportes_mensajes
        FOREIGN KEY (mensaje_id)
        REFERENCES mensajes_privados(id)
        ON DELETE RESTRICT
);

-- 3. Auditoría de moderación
CREATE TABLE IF NOT EXISTS mensajes_moderacion_auditoria (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    mensaje_id BIGINT UNSIGNED NOT NULL,
    reporte_id BIGINT UNSIGNED NULL,
    accion ENUM('REVISION', 'RETIRADA') NOT NULL,
    administrador_id INT NULL,
    administrador_usuario VARCHAR(255) NULL,
    detalle VARCHAR(1000) NULL,
    fecha_accion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_auditoria_mensaje (mensaje_id, fecha_accion),

    CONSTRAINT fk_auditoria_mensaje
        FOREIGN KEY (mensaje_id)
        REFERENCES mensajes_privados(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_auditoria_reporte
        FOREIGN KEY (reporte_id)
        REFERENCES reportes_mensajes(id)
        ON DELETE RESTRICT
);

ALTER TABLE mensajes_moderacion_auditoria
    ADD COLUMN administrador_usuario VARCHAR(255) NULL;
    
    
    
USE BaseDeDatosEscuelas;

ALTER TABLE resultados
  ADD COLUMN archivo_corregido VARCHAR(255) NULL,
  ADD COLUMN nombre_archivo_corregido VARCHAR(255) NULL,
  ADD COLUMN decision_apto ENUM('APTO', 'NO_APTO') NULL,
  ADD COLUMN estado_certificado
    ENUM('PENDIENTE', 'EMITIDO', 'ENTREGADO')
    NOT NULL DEFAULT 'PENDIENTE';




USE BaseDeDatosEscuelas;

ALTER TABLE recursos
  MODIFY COLUMN nombre_archivo VARCHAR(255) NULL,
  MODIFY COLUMN ruta_archivo VARCHAR(500) NULL,
  ADD COLUMN url VARCHAR(2048) NULL;




USE BaseDeDatosEscuelas;

CREATE TABLE IF NOT EXISTS actividades (
    id INT NOT NULL AUTO_INCREMENT,
    escuela_id INT NOT NULL,
    grupo_id INT NOT NULL,
    profesor_id INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NULL,
    fecha_entrega DATE NULL,
    publicado TINYINT(1) NOT NULL DEFAULT 1,
    fecha_publicacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_actividades_escuela (escuela_id),
    INDEX idx_actividades_grupo (grupo_id),
    INDEX idx_actividades_profesor (profesor_id)
);



ALTER TABLE tareas
ADD COLUMN actividad_id INT NULL;

ALTER TABLE resultados
ADD COLUMN actividad_id INT NULL;



USE BaseDeDatosEscuelas;

DELIMITER $$

CREATE TRIGGER profesores_historial_insert
AFTER INSERT ON profesores
FOR EACH ROW
BEGIN
    INSERT INTO profesores_historial (
        profesor_id,
        accion,
        usuario_mysql,
        datos_anteriores,
        datos_nuevos
    )
    VALUES (
        NEW.id,
        'INICIAL',
        CURRENT_USER(),
        NULL,
        JSON_OBJECT(
            'id', NEW.id,
            'tipo_documento', NEW.tipo_documento,
            'documento', NEW.documento,
            'nombre', NEW.nombre,
            'apellidos', NEW.apellidos,
            'anio_nacimiento', NEW.anio_nacimiento,
            'telefono', NEW.telefono,
            'email', NEW.email,
            'especialidad', NEW.especialidad,
            'foto', NEW.foto,
            'activo', NEW.activo,
            'fecha_creacion', NEW.fecha_creacion
        )
    );
END$$

CREATE TRIGGER profesores_historial_update
AFTER UPDATE ON profesores
FOR EACH ROW
BEGIN
    INSERT INTO profesores_historial (
        profesor_id,
        accion,
        usuario_mysql,
        datos_anteriores,
        datos_nuevos
    )
    VALUES (
        NEW.id,
        'MODIFICACION',
        CURRENT_USER(),
        JSON_OBJECT(
            'id', OLD.id,
            'tipo_documento', OLD.tipo_documento,
            'documento', OLD.documento,
            'nombre', OLD.nombre,
            'apellidos', OLD.apellidos,
            'anio_nacimiento', OLD.anio_nacimiento,
            'telefono', OLD.telefono,
            'email', OLD.email,
            'especialidad', OLD.especialidad,
            'foto', OLD.foto,
            'activo', OLD.activo,
            'fecha_creacion', OLD.fecha_creacion
        ),
        JSON_OBJECT(
            'id', NEW.id,
            'tipo_documento', NEW.tipo_documento,
            'documento', NEW.documento,
            'nombre', NEW.nombre,
            'apellidos', NEW.apellidos,
            'anio_nacimiento', NEW.anio_nacimiento,
            'telefono', NEW.telefono,
            'email', NEW.email,
            'especialidad', NEW.especialidad,
            'foto', NEW.foto,
            'activo', NEW.activo,
            'fecha_creacion', NEW.fecha_creacion
        )
    );
END$$

CREATE TRIGGER profesores_historial_delete
AFTER DELETE ON profesores
FOR EACH ROW
BEGIN
    INSERT INTO profesores_historial (
        profesor_id,
        accion,
        usuario_mysql,
        datos_anteriores,
        datos_nuevos
    )
    VALUES (
        OLD.id,
        'ELIMINACION',
        CURRENT_USER(),
        JSON_OBJECT(
            'id', OLD.id,
            'tipo_documento', OLD.tipo_documento,
            'documento', OLD.documento,
            'nombre', OLD.nombre,
            'apellidos', OLD.apellidos,
            'anio_nacimiento', OLD.anio_nacimiento,
            'telefono', OLD.telefono,
            'email', OLD.email,
            'especialidad', OLD.especialidad,
            'foto', OLD.foto,
            'activo', OLD.activo,
            'fecha_creacion', OLD.fecha_creacion
        ),
        NULL
    );
END$$

DELIMITER ;

USE BaseDeDatosEscuelas;

INSERT INTO profesores_historial (
    profesor_id,
    accion,
    usuario_mysql,
    datos_anteriores,
    datos_nuevos
)
SELECT
    p.id,
    'INICIAL',
    CURRENT_USER(),
    NULL,
    JSON_OBJECT(
        'id', p.id,
        'tipo_documento', p.tipo_documento,
        'documento', p.documento,
        'nombre', p.nombre,
        'apellidos', p.apellidos,
        'anio_nacimiento', p.anio_nacimiento,
        'telefono', p.telefono,
        'email', p.email,
        'especialidad', p.especialidad,
        'foto', p.foto,
        'activo', p.activo,
        'fecha_creacion', p.fecha_creacion
    )
FROM profesores p
WHERE NOT EXISTS (
    SELECT 1
    FROM profesores_historial h
    WHERE h.profesor_id = p.id
);



USE BaseDeDatosEscuelas;

SELECT
    g.id AS grupo_id,
    e.nombre AS escuela,
    c.nombre AS curso,
    g.nombre AS grupo,
    g.turno,
    g.aula,
    p.nombre AS profesor_nombre,
    p.apellidos AS profesor_apellidos
FROM grupos g
INNER JOIN escuelas e ON e.id = g.escuela_id
INNER JOIN cursos c ON c.id = g.curso_id
LEFT JOIN profesores p ON p.id = g.profesor_id
ORDER BY g.escuela_id, g.id;





USE BaseDeDatosEscuelas;

CREATE TABLE IF NOT EXISTS asistencia_sesiones (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    grupo_id INT NOT NULL,
    horario_id INT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('REALIZADA', 'CANCELADA')
        NOT NULL DEFAULT 'REALIZADA',
    creado_por INT NULL,
    actualizado_por INT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_asistencia_horario_fecha (horario_id, fecha),
    INDEX idx_asistencia_grupo_fecha (grupo_id, fecha)
);

CREATE TABLE IF NOT EXISTS asistencia_registros (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sesion_id INT NOT NULL,
    alumno_id INT NOT NULL,
    estado ENUM('PRESENTE', 'AUSENTE', 'PARCIAL')
        NOT NULL DEFAULT 'AUSENTE',
    minutos_asistidos INT UNSIGNED NOT NULL DEFAULT 0,
    registrado_por INT NOT NULL,
    actualizado_por INT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_asistencia_alumno_sesion (sesion_id, alumno_id),
    INDEX idx_asistencia_alumno (alumno_id),
    INDEX idx_asistencia_sesion (sesion_id)
);

CREATE TABLE IF NOT EXISTS asistencia_historial (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    asistencia_id INT NOT NULL,
    estado_anterior VARCHAR(20) NULL,
    estado_nuevo VARCHAR(20) NOT NULL,
    minutos_anteriores INT UNSIGNED NULL,
    minutos_nuevos INT UNSIGNED NOT NULL,
    profesor_id INT NOT NULL,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_historial_asistencia (asistencia_id)
);


USE BaseDeDatosEscuelas;

INSERT INTO profesores_historial (
    profesor_id,
    accion,
    usuario_mysql,
    datos_anteriores,
    datos_nuevos
)
SELECT
    p.id,
    'INICIAL',
    CURRENT_USER(),
    NULL,
    JSON_OBJECT(
        'id', p.id,
        'tipo_documento', p.tipo_documento,
        'documento', p.documento,
        'nombre', p.nombre,
        'apellidos', p.apellidos,
        'anio_nacimiento', p.anio_nacimiento,
        'telefono', p.telefono,
        'email', p.email,
        'especialidad', p.especialidad,
        'foto', p.foto,
        'activo', p.activo,
        'fecha_creacion', p.fecha_creacion
    )
FROM profesores p
WHERE NOT EXISTS (
    SELECT 1
    FROM profesores_historial h
    WHERE h.profesor_id = p.id
);

SELECT
    historial_id,
    profesor_id,
    accion,
    fecha_cambio,
    datos_nuevos
FROM profesores_historial
ORDER BY historial_id DESC;



START TRANSACTION;

UPDATE profesores
SET telefono = '600000099'
WHERE id = 1;

SELECT
    historial_id,
    profesor_id,
    accion,
    datos_anteriores,
    datos_nuevos
FROM profesores_historial
WHERE profesor_id = 1
ORDER BY historial_id DESC
LIMIT 2;

ROLLBACK;





ALTER TABLE solicitudes_matricula
ADD COLUMN turno_preferido ENUM('Mañana', 'Tarde') NULL
AFTER escuela_id;



-- ============================================================
-- foro_moderacion_auditoria 
-- ============================================================

CREATE TABLE IF NOT EXISTS foro_moderacion_auditoria (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    tabla_origen VARCHAR(50) NOT NULL,
    mensaje_id INT NOT NULL,
    accion ENUM('OCULTAR', 'MOSTRAR', 'ELIMINAR') NOT NULL,
    administrador VARCHAR(255) NULL,
    motivo VARCHAR(500) NOT NULL,
    contenido_original LONGTEXT NOT NULL,
    fecha_accion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_foro_mensaje (tabla_origen, mensaje_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE foro_mensajes
    ADD COLUMN respuesta_a_id INT NULL AFTER profesor_id,
    ADD COLUMN titulo VARCHAR(180) NULL AFTER respuesta_a_id,
    ADD COLUMN categoria VARCHAR(80) NULL AFTER titulo,
    ADD INDEX idx_foro_respuesta (respuesta_a_id),
    ADD CONSTRAINT fk_foro_respuesta
        FOREIGN KEY (respuesta_a_id)
        REFERENCES foro_mensajes(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL;
        
        

CREATE TABLE IF NOT EXISTS foro_profesores_respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    mensaje_id INT NOT NULL,

    profesor_id INT NOT NULL,

    escuela_id INT NOT NULL,

    respuesta TEXT NOT NULL,

    fecha_creacion TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    activo TINYINT(1) NOT NULL DEFAULT 1,

    INDEX idx_respuestas_mensaje (mensaje_id),

    INDEX idx_respuestas_profesor (profesor_id),

    INDEX idx_respuestas_escuela (escuela_id),

    CONSTRAINT fk_respuestas_mensaje
        FOREIGN KEY (mensaje_id)
        REFERENCES foro_profesores(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_respuestas_profesor
        FOREIGN KEY (profesor_id)
        REFERENCES profesores(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_respuestas_escuela
        FOREIGN KEY (escuela_id)
        REFERENCES escuelas(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
  
  
  
  ALTER TABLE avisos
ADD COLUMN escuela_id INT NULL AFTER id,
ADD COLUMN origen ENUM('PROFESOR', 'ADMIN')
    NOT NULL DEFAULT 'PROFESOR' AFTER profesor_id;
    
    
    UPDATE avisos a
INNER JOIN grupos g ON g.id = a.grupo_id
SET a.escuela_id = g.escuela_id;

ALTER TABLE avisos
MODIFY COLUMN grupo_id INT NULL;

ALTER TABLE avisos
ADD INDEX idx_avisos_escuela (escuela_id),
ADD CONSTRAINT fk_avisos_escuela
FOREIGN KEY (escuela_id)
REFERENCES escuelas(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;



-- =====================================================
-- 1. CREAR TABLA DE CONVERSACIONES
-- =====================================================

CREATE TABLE conversaciones_privadas (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    escuela_id INT NOT NULL,
    grupo_id INT NOT NULL,

    tipo_conversacion ENUM(
        'ALUMNO_PROFESOR',
        'ALUMNO_ALUMNO'
    ) NOT NULL,

    participante1_tipo ENUM(
        'ALUMNO',
        'PROFESOR'
    ) NOT NULL,

    participante1_id INT NOT NULL,

    participante2_tipo ENUM(
        'ALUMNO',
        'PROFESOR'
    ) NOT NULL,

    participante2_id INT NOT NULL,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_conversacion_participantes (
        escuela_id,
        grupo_id,
        participante1_tipo,
        participante1_id,
        participante2_tipo,
        participante2_id
    ),

    KEY idx_conversaciones_grupo (
        escuela_id,
        grupo_id
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =====================================================
-- 2. AÑADIR REFERENCIA A LA CONVERSACIÓN
-- =====================================================

ALTER TABLE mensajes_privados
ADD COLUMN conversacion_id BIGINT UNSIGNED NULL
AFTER id;

CREATE INDEX idx_mensajes_conversacion_id
ON mensajes_privados (conversacion_id, fecha_envio);


-- =====================================================
-- 3. CREAR CONVERSACIONES PARA LOS MENSAJES EXISTENTES
-- =====================================================

INSERT INTO conversaciones_privadas (
    escuela_id,
    grupo_id,
    tipo_conversacion,
    participante1_tipo,
    participante1_id,
    participante2_tipo,
    participante2_id,
    fecha_creacion
)
SELECT
    escuela_id,
    grupo_id,
    'ALUMNO_PROFESOR',
    'ALUMNO',
    alumno_id,
    'PROFESOR',
    profesor_id,
    MIN(fecha_envio)
FROM mensajes_privados
GROUP BY
    escuela_id,
    grupo_id,
    alumno_id,
    profesor_id;


-- =====================================================
-- 4. VINCULAR CADA MENSAJE CON SU CONVERSACIÓN
-- =====================================================

UPDATE mensajes_privados mp
INNER JOIN conversaciones_privadas cp
    ON cp.escuela_id = mp.escuela_id
    AND cp.grupo_id = mp.grupo_id
    AND cp.tipo_conversacion = 'ALUMNO_PROFESOR'
    AND cp.participante1_tipo = 'ALUMNO'
    AND cp.participante1_id = mp.alumno_id
    AND cp.participante2_tipo = 'PROFESOR'
    AND cp.participante2_id = mp.profesor_id
SET mp.conversacion_id = cp.id;


-- =====================================================
-- 5. HACER OBLIGATORIA LA CONVERSACIÓN
-- =====================================================

ALTER TABLE mensajes_privados
MODIFY COLUMN conversacion_id BIGINT UNSIGNED NOT NULL;



CREATE TABLE conversaciones_privadas (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    escuela_id INT NOT NULL,
    grupo_id INT NOT NULL,
    tipo_conversacion ENUM(
        'ALUMNO_PROFESOR',
        'ALUMNO_ALUMNO'
    ) NOT NULL,
    participante1_tipo ENUM(
        'ALUMNO',
        'PROFESOR'
    ) NOT NULL,
    participante1_id INT NOT NULL,
    participante2_tipo ENUM(
        'ALUMNO',
        'PROFESOR'
    ) NOT NULL,
    participante2_id INT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_conversacion_participantes (
        escuela_id,
        grupo_id,
        participante1_tipo,
        participante1_id,
        participante2_tipo,
        participante2_id
    ),
    KEY idx_conversaciones_grupo (escuela_id, grupo_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
  
  
  CREATE INDEX idx_mensajes_conversacion_id
ON mensajes_privados (conversacion_id, fecha_envio);


ALTER TABLE mensajes_privados
MODIFY COLUMN conversacion_id BIGINT UNSIGNED NOT NULL;


SELECT
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'mensajes_privados'
  AND COLUMN_NAME IN ('alumno_id', 'profesor_id');
  
  ALTER TABLE mensajes_privados
MODIFY COLUMN profesor_id INT NULL;


SELECT
    @@global.time_zone AS zona_global,
    @@session.time_zone AS zona_sesion,
    NOW() AS hora_mysql,
    UTC_TIMESTAMP() AS hora_utc;
    
    ALTER TABLE recursos
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE avisos
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;




-- ============================================================
-- A. AÑADIR LAS COLUMNAS QUE NECESITA EL ACCESO DE PROFESORES
-- Ejecutar solo si todavía no existen.
-- ============================================================

ALTER TABLE profesores
    ADD COLUMN anio_nacimiento SMALLINT UNSIGNED NULL
        AFTER apellidos,
    ADD COLUMN foto VARCHAR(255) NULL
        AFTER especialidad;


-- ============================================================
-- B. CREAR UN PROFESOR DE PRUEBA PARA CADA ESCUELA
-- Joan Miró = escuela 1
-- Ateneu Aula 502 = escuela 2
-- ============================================================

INSERT INTO profesores (
    tipo_documento,
    documento,
    nombre,
    apellidos,
    anio_nacimiento,
    telefono,
    email,
    especialidad,
    foto,
    activo
)
SELECT
    'NIE',
    '00000001R',
    'Profesor',
    'Prueba Joan Miro',
    1980,
    '600000001',
    'profesor.joanmiro@example.com',
    'Castellano',
    NULL,
    1
WHERE NOT EXISTS (
    SELECT 1
    FROM profesores
    WHERE documento = '00000001R'
       OR email = 'profesor.joanmiro@example.com'
);

INSERT INTO profesores (
    tipo_documento,
    documento,
    nombre,
    apellidos,
    anio_nacimiento,
    telefono,
    email,
    especialidad,
    foto,
    activo
)
SELECT
    'NIE',
    '00000002W',
    'Profesor',
    'Prueba Ateneu',
    1981,
    '600000002',
    'profesor.ateneu@example.com',
    'Castellano',
    NULL,
    1
WHERE NOT EXISTS (
    SELECT 1
    FROM profesores
    WHERE documento = '00000002W'
       OR email = 'profesor.ateneu@example.com'
);


-- ============================================================
-- C. ASEGURAR LOS DOS TURNOS PARA CADA CURSO Y ESCUELA
-- No duplica una combinación curso + escuela + turno que ya exista.
-- ============================================================

INSERT INTO grupos (
    curso_id,
    escuela_id,
    profesor_id,
    nombre,
    aula,
    turno,
    activo
)
SELECT
    c.id,
    e.id,
    p.id,
    CONCAT(c.nombre, ' - ', t.turno),
    'Por asignar',
    t.turno,
    1
FROM cursos c
CROSS JOIN escuelas e
CROSS JOIN (
    SELECT 'Mañana' AS turno
    UNION ALL
    SELECT 'Tarde' AS turno
) t
INNER JOIN profesores p
    ON p.documento = CASE
        WHEN e.id = 1 THEN '00000001R'
        WHEN e.id = 2 THEN '00000002W'
    END
WHERE c.activo = 1
  AND e.activa = 1
  AND e.id IN (1, 2)
  AND NOT EXISTS (
      SELECT 1
      FROM grupos g
      WHERE g.curso_id = c.id
        AND g.escuela_id = e.id
        AND g.turno = t.turno
  );


-- ============================================================
-- D. ASIGNAR CADA PROFESOR DE PRUEBA A LOS GRUPOS DE SU ESCUELA
-- Y normalizar los nombres de los grupos.
-- ============================================================

UPDATE grupos g
INNER JOIN cursos c
    ON c.id = g.curso_id
INNER JOIN profesores p
    ON p.documento = CASE
        WHEN g.escuela_id = 1 THEN '00000001R'
        WHEN g.escuela_id = 2 THEN '00000002W'
    END
SET
    g.profesor_id = p.id,
    g.nombre = CONCAT(c.nombre, ' - ', g.turno),
    g.activo = 1
WHERE g.escuela_id IN (1, 2)
  AND g.turno IN ('Mañana', 'Tarde');


-- ============================================================
-- E. CREAR UN ALUMNO DE PRUEBA PARA CADA ESCUELA
-- ============================================================

INSERT INTO alumnos (
    tipo_documento,
    documento,
    nombre,
    apellidos,
    pais_origen,
    telefono,
    email,
    fecha_nacimiento,
    alumno_anterior,
    activo
)
SELECT
    'NIE',
    'X0000001A',
    'Alumno',
    'Prueba Joan Miro',
    'Prueba',
    '600000101',
    'alumno.joanmiro@example.com',
    '2000-01-15',
    0,
    1
WHERE NOT EXISTS (
    SELECT 1
    FROM alumnos
    WHERE documento = 'X0000001A'
       OR email = 'alumno.joanmiro@example.com'
);

INSERT INTO alumnos (
    tipo_documento,
    documento,
    nombre,
    apellidos,
    pais_origen,
    telefono,
    email,
    fecha_nacimiento,
    alumno_anterior,
    activo
)
SELECT
    'NIE',
    'X0000002B',
    'Alumno',
    'Prueba Ateneu',
    'Prueba',
    '600000102',
    'alumno.ateneu@example.com',
    '2001-02-20',
    0,
    1
WHERE NOT EXISTS (
    SELECT 1
    FROM alumnos
    WHERE documento = 'X0000002B'
       OR email = 'alumno.ateneu@example.com'
);


-- ============================================================
-- F. MATRICULAR CADA ALUMNO EN CASTELLANO A1 - MAÑANA
-- Joan Miró y Ateneu tienen matrículas independientes.
-- ============================================================

INSERT INTO matriculas (
    alumno_id,
    grupo_id,
    fecha_matricula,
    estado
)
SELECT
    a.id,
    g.id,
    CURDATE(),
    'ACTIVA'
FROM alumnos a
INNER JOIN grupos g
    ON g.escuela_id = CASE
        WHEN a.documento = 'X0000001A' THEN 1
        WHEN a.documento = 'X0000002B' THEN 2
    END
INNER JOIN cursos c
    ON c.id = g.curso_id
WHERE (
        (a.documento = 'X0000001A'
         AND a.email = 'alumno.joanmiro@example.com')
     OR (a.documento = 'X0000002B'
         AND a.email = 'alumno.ateneu@example.com')
)
  AND a.activo = 1
  AND c.idioma = 'Castellano'
  AND c.nivel = 'A1'
  AND g.turno = 'Mañana'
  AND g.activo = 1
  AND NOT EXISTS (
      SELECT 1
      FROM matriculas m
      WHERE m.alumno_id = a.id
        AND m.grupo_id = g.id
  );


-- ============================================================
-- G. COMPROBAR LOS RESULTADOS
-- ============================================================

SELECT id, nombre, apellidos, documento, email,
       anio_nacimiento, telefono, activo
FROM profesores
WHERE documento IN ('00000001R', '00000002W');

SELECT id, nombre, apellidos, documento, email, activo
FROM alumnos
WHERE documento IN ('X0000001A', 'X0000002B');

SELECT
    e.nombre AS escuela,
    c.nombre AS curso,
    g.nombre AS grupo,
    g.turno,
    p.nombre AS profesor,
    p.apellidos AS apellidos_profesor
FROM grupos g
INNER JOIN escuelas e ON e.id = g.escuela_id
INNER JOIN cursos c ON c.id = g.curso_id
LEFT JOIN profesores p ON p.id = g.profesor_id
WHERE e.id IN (1, 2)
ORDER BY e.id, c.id,
         FIELD(g.turno, 'Mañana', 'Tarde');

SELECT
    e.nombre AS escuela,
    a.nombre AS alumno,
    a.apellidos,
    c.nombre AS curso,
    g.turno,
    m.estado AS estado_matricula
FROM matriculas m
INNER JOIN alumnos a ON a.id = m.alumno_id
INNER JOIN grupos g ON g.id = m.grupo_id
INNER JOIN escuelas e ON e.id = g.escuela_id
INNER JOIN cursos c ON c.id = g.curso_id
WHERE a.documento IN ('X0000001A', 'X0000002B');



USE BaseDeDatosEscuelas;

ALTER TABLE escuelas
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE cursos
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE grupos
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE horarios
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE foro_mensajes
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE foro_profesores
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE foro_profesores_respuestas
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE mensajes_privados
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE mensajes
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;



ALTER TABLE actividades
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE matriculas
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE alumnos
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;

ALTER TABLE profesores
ADD COLUMN oculto_admin TINYINT(1) NOT NULL DEFAULT 0;