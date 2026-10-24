-- ============================================================
-- BASE DE DATOS COMPLETA PARA LAS DOS ESCUELAS
-- ============================================================

DROP DATABASE IF EXISTS BaseDeDatosEscuelas;

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

    telefono VARCHAR(30),

    email VARCHAR(150),

    especialidad VARCHAR(100),

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (documento),

    UNIQUE (email),

    CHECK (
        email IS NULL
        OR email <> ''
    )
) ENGINE=InnoDB;


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


CREATE TABLE historial_perfil_profesores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profesor_id INT NOT NULL,
    campo_modificado VARCHAR(50) NOT NULL,
    valor_anterior TEXT,
    valor_nuevo TEXT,
    modificado_por INT, -- ID del usuario que hizo el cambio
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DELIMITER //

-- 1. Eliminamos el trigger anterior para limpiar la memoria
DROP TRIGGER IF EXISTS auditar_cambios_profesor;

-- 2. Cambiamos el delimitador para el nuevo bloque
DELIMITER //

-- 3. Creamos la versión definitiva con los 5 campos protegidos
CREATE TRIGGER auditar_cambios_profesor
AFTER UPDATE ON profesores
FOR EACH ROW
BEGIN
    -- 1. Monitorear cambio en el nombre
    IF NOT (OLD.nombre <=> NEW.nombre) THEN
        INSERT INTO historial_perfil_profesores (profesor_id, campo_modificado, valor_anterior, valor_nuevo, modificado_por)
        VALUES (OLD.id, 'nombre', OLD.nombre, NEW.nombre, NULL);
    END IF;

    -- 2. Monitorear cambio en los apellidos
    IF NOT (OLD.apellidos <=> NEW.apellidos) THEN
        INSERT INTO historial_perfil_profesores (profesor_id, campo_modificado, valor_anterior, valor_nuevo, modificado_por)
        VALUES (OLD.id, 'apellidos', OLD.apellidos, NEW.apellidos, NULL);
    END IF;

    -- 3. Monitorear cambio en el email
    IF NOT (OLD.email <=> NEW.email) THEN
        INSERT INTO historial_perfil_profesores (profesor_id, campo_modificado, valor_anterior, valor_nuevo, modificado_por)
        VALUES (OLD.id, 'email', OLD.email, NEW.email, NULL);
    END IF;

    -- 4. Monitorear cambio en la especialidad
    IF NOT (OLD.especialidad <=> NEW.especialidad) THEN
        INSERT INTO historial_perfil_profesores (profesor_id, campo_modificado, valor_anterior, valor_nuevo, modificado_por)
        VALUES (OLD.id, 'especialidad', OLD.especialidad, NEW.especialidad, NULL);
    END IF;

    -- 5. Monitorear cambio en la foto
    IF NOT (OLD.foto <=> NEW.foto) THEN
        INSERT INTO historial_perfil_profesores (profesor_id, campo_modificado, valor_anterior, valor_nuevo, modificado_por)
        VALUES (OLD.id, 'foto', OLD.foto, NEW.foto, NULL);
    END IF;
END //

DELIMITER ;






