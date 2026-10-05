
DROP DATABASE IF EXISTS EscuelaBibliotecaJuanMiroDB;
CREATE DATABASE EscuelaBibliotecaJuanMiroDB;
USE EscuelaBibliotecaJuanMiroDB;


-- =========================================
-- TABLA PROFESORES
-- Solo información de los profesores
-- =========================================

CREATE TABLE profesores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento ENUM('DNI', 'NIE', 'PASAPORTE') NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    especialidad VARCHAR(50),

    CHECK (
        (tipo_documento = 'DNI'
        AND documento REGEXP '^[0-9]{8}[A-Za-z]$')

        OR

        (tipo_documento = 'NIE'
        AND documento REGEXP '^[XYZxyz][0-9]{7}[A-Za-z]$')

        OR

        (tipo_documento = 'PASAPORTE'
        AND documento REGEXP '^(?=.*[A-Za-z])[A-Za-z0-9]{2,11}$')
    )
);


-- =========================================
-- TABLA ALUMNADO
-- Solo información del alumnado
-- =========================================

CREATE TABLE alumnado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento ENUM('DNI', 'NIE', 'PASAPORTE') NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    fecha_nacimiento DATE,

    CHECK (
        (tipo_documento = 'DNI'
        AND documento REGEXP '^[0-9]{8}[A-Za-z]$')

        OR

        (tipo_documento = 'NIE'
        AND documento REGEXP '^[XYZxyz][0-9]{7}[A-Za-z]$')

        OR

        (tipo_documento = 'PASAPORTE'
        AND documento REGEXP '^(?=.*[A-Za-z])[A-Za-z0-9]{2,11}$')
    )
);


-- =========================================
-- TABLA CLASES
-- De momento solo Castellano y Catalán
-- =========================================

CREATE TABLE clases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    idioma ENUM('Castellano', 'Catalán') NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    horario VARCHAR(100),
    aula VARCHAR(20)
);


-- =========================================
-- TABLA MATRICULAS
-- Relaciona el alumnado con las clases
-- =========================================

CREATE TABLE matriculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumnado_id INT NOT NULL,
    clase_id INT NOT NULL,

    FOREIGN KEY (alumnado_id)
    REFERENCES alumnado(id),

    FOREIGN KEY (clase_id)
    REFERENCES clases(id),

    UNIQUE (alumnado_id, clase_id)
);


-- =========================================
-- TABLA PROFESORES_CLASES
-- Relaciona los profesores con las clases
-- =========================================

CREATE TABLE profesores_clases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profesor_id INT NOT NULL,
    clase_id INT NOT NULL,

    FOREIGN KEY (profesor_id)
    REFERENCES profesores(id),

    FOREIGN KEY (clase_id)
    REFERENCES clases(id),

    UNIQUE (profesor_id, clase_id)
);


-- =========================================
-- INSERTAR PROFESORES
-- =========================================

INSERT INTO profesores
(tipo_documento, documento, nombre, apellidos, telefono, email, especialidad)
VALUES

('DNI',
'12345678Z',
'Laura',
'García López',
'600111111',
'laura@escuelajuanmiro.com',
'Castellano'),

('NIE',
'X1234567L',
'Carlos',
'Martínez Pérez',
'600222222',
'carlos@escuelajuanmiro.com',
'Catalán'),

('PASAPORTE',
'AB1234567',
'Marta',
'Sánchez Ruiz',
'600333333',
'marta@escuelajuanmiro.com',
'Castellano');


-- =========================================
-- INSERTAR ALUMNADO
-- =========================================

INSERT INTO alumnado
(tipo_documento, documento, nombre, apellidos, telefono, email, fecha_nacimiento)
VALUES

('NIE',
'Y1234567M',
'Ahmed',
'Hassan',
'611111111',
'ahmed@email.com',
'1995-05-12'),

('PASAPORTE',
'AB1234567',
'Sara',
'Khalil',
'622222222',
'sara@email.com',
'2001-08-20'),

('NIE',
'Z1234567N',
'Mohamed',
'Karim',
'633333333',
'mohamed@email.com',
'1998-02-15'),

('DNI',
'12345678X',
'Ana',
'Gómez',
'644444444',
'ana@email.com',
'2003-11-10'),

('PASAPORTE',
'P123456789',
'Fatima',
'Rahimi',
'655555555',
'fatima@email.com',
'1997-06-25');


-- =========================================
-- INSERTAR CLASES
-- =========================================

INSERT INTO clases
(nombre, idioma, nivel, horario, aula)
VALUES

('Castellano A1',
'Castellano',
'A1',
'Lunes y Miércoles 10:00-12:00',
'Aula 1'),

('Castellano A2',
'Castellano',
'A2',
'Martes y Jueves 10:00-12:00',
'Aula 2'),

('Castellano B1',
'Castellano',
'B1',
'Lunes y Miércoles 16:00-18:00',
'Aula 3'),

('Catalán A1',
'Catalán',
'A1',
'Martes y Jueves 16:00-18:00',
'Aula 4'),

('Catalán A2',
'Catalán',
'A2',
'Lunes y Miércoles 18:00-20:00',
'Aula 5');


-- =========================================
-- MATRICULAR ALUMNADO
-- =========================================

INSERT INTO matriculas
(alumnado_id, clase_id)
VALUES

(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(1, 5);


-- =========================================
-- ASIGNAR PROFESORES A CLASES
-- =========================================

INSERT INTO profesores_clases
(profesor_id, clase_id)
VALUES

(1, 1),
(1, 2),
(3, 3),
(2, 4),
(2, 5);


-- =========================================
-- CONSULTAS
-- =========================================

SHOW TABLES;


-- Ver profesores
SELECT * FROM profesores;


-- Ver alumnado
SELECT * FROM alumnado;


-- Ver clases
SELECT * FROM clases;


-- Ver matrículas
SELECT * FROM matriculas;


-- Ver profesores y sus clases
SELECT
    profesores.nombre,
    profesores.apellidos,
    profesores.documento,
    clases.nombre AS clase,
    clases.idioma,
    clases.nivel
FROM profesores_clases
INNER JOIN profesores
ON profesores_clases.profesor_id = profesores.id
INNER JOIN clases
ON profesores_clases.clase_id = clases.id;


-- Ver alumnado y sus clases
SELECT
    alumnado.nombre,
    alumnado.apellidos,
    alumnado.documento,
    clases.nombre AS clase,
    clases.idioma,
    clases.nivel
FROM matriculas
INNER JOIN alumnado
ON matriculas.alumnado_id = alumnado.id
INNER JOIN clases
ON matriculas.clase_id = clases.id;


-- Ver solamente las clases de Castellano
SELECT *
FROM clases
WHERE idioma = 'Castellano';


-- Ver solamente las clases de Catalán
SELECT *
FROM clases
WHERE idioma = 'Catalán';


-- Ver clases de nivel A1
SELECT *
FROM clases
WHERE nivel = 'A1';