const db = require('../../config/database')
const getAlumnado = async () => {
    const [rows] = await db.query(
        'SELECT * FROM alumnado'
    )

    return rows
}

const getAlumnoById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM alumnado WHERE id = ?',
        [id]
    )

    return rows[0]
}

const createAlumno = async (alumno) => {
    const {
        tipo_documento,
        documento,
        nombre,
        apellidos,
        telefono,
        email,
        fecha_nacimiento
    } = alumno

    const [result] = await db.query(
        `INSERT INTO alumnado
        (tipo_documento, documento, nombre, apellidos, telefono, email, fecha_nacimiento)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            tipo_documento,
            documento,
            nombre,
            apellidos,
            telefono,
            email,
            fecha_nacimiento
        ]
    )

    return result.insertId
}

const deleteAlumno = async (id) => {
    const [result] = await db.query(
        'DELETE FROM alumnado WHERE id = ?',
        [id]
    )

    return result.affectedRows
}

module.exports = {
    getAlumnado,
    getAlumnoById,
    createAlumno,
    deleteAlumno
}