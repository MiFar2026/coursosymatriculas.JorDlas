DROP DATABASE IF EXISTS CursosGeneralesDB;
CREATE DATABASE CursosGeneralesDB;
USE CursosGeneralesDB;


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
        AND documento REGEXP '^(?=.*[A-Za-z])[A-Za-z0-9]{1,11}$')
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
        AND documento REGEXP '^(?=.*[A-Za-z])[A-Za-z0-9]{1,11}$')
    )
);


-- =========================================
-- TABLA CLASES
-- Castellano, Catalán y Alfabetización
-- =========================================

CREATE TABLE clases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    idioma ENUM('Castellano', 'Catalán', 'Alfabetización') NOT NULL,
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
'23456789A',
'Elena',
'Martínez García',
'600111111',
'elena@ateneu502.com',
'Castellano'),

('NIE',
'X2345678B',
'Jordi',
'Puig Ferrer',
'600222222',
'jordi@ateneu502.com',
'Catalán'),

('PASAPORTE',
'P123456789',
'Samira',
'Haddad Karim',
'600333333',
'samira@ateneu502.com',
'Alfabetización');


-- =========================================
-- INSERTAR ALUMNADO
-- =========================================

INSERT INTO alumnado
(tipo_documento, documento, nombre, apellidos, telefono, email, fecha_nacimiento)
VALUES

('NIE',
'Y2345678C',
'Ahmed',
'Benali',
'611111111',
'ahmed@email.com',
'1995-05-12'),

('PASAPORTE',
'A123456789',
'Sara',
'Hassan',
'622222222',
'sara@email.com',
'2001-08-20'),

('NIE',
'Z2345678D',
'Mohamed',
'Karim',
'633333333',
'mohamed@email.com',
'1998-02-15'),

('DNI',
'23456789B',
'Laura',
'Gómez Ruiz',
'644444444',
'laura@email.com',
'2003-11-10'),

('PASAPORTE',
'B987654321',
'Fatima',
'Rahimi',
'655555555',
'fatima@email.com',
'1997-06-25');


-- =========================================
-- INSERTAR CLASES (Nuevos Cursos Solicitados)
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
'Aula 5'),

('Catalán B1',
'Catalán',
'B1',
'Martes y Jueves 18:00-20:00',
'Aula 6'),

('Alfabetización Inicial',
'Alfabetización',
'Inicial',
'Viernes 09:00-12:00',
'Aula Magna');


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
(1, 5),
(2, 7); -- Alumno matriculado en Alfabetización Inicial


-- =========================================
-- ASIGNAR PROFESORES A CLASES
-- =========================================

INSERT INTO profesores_clases
(profesor_id, clase_id)
VALUES

(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7); -- Samira asignada a Alfabetización Inicial


-- =========================================
-- CONSULTAS DE VERIFICACIÓN
-- =========================================

-- Ver todas las clases activas en la web
SELECT * FROM clases;

-- Ver solamente las clases de Alfabetización
SELECT * FROM clases WHERE idioma = 'Alfabetización';
