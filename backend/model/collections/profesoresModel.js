const db = require('../../config/database')
const getProfesores = async () => {
    const [rows] = await db.query(
        'SELECT * FROM profesores'
    )

    return rows
}

const getProfesorById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM profesores WHERE id = ?',
        [id]
    )

    return rows[0]
}

const createProfesor = async (profesor) => {
    const {
        tipo_documento,
        documento,
        nombre,
        apellidos,
        telefono,
        email,
        especialidad
    } = profesor

    const [result] = await db.query(
        `INSERT INTO profesores
        (tipo_documento, documento, nombre, apellidos, telefono, email, especialidad)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            tipo_documento,
            documento,
            nombre,
            apellidos,
            telefono,
            email,
            especialidad
        ]
    )

    return result.insertId
}

const deleteProfesor = async (id) => {
    const [result] = await db.query(
        'DELETE FROM profesores WHERE id = ?',
        [id]
    )

    return result.affectedRows
}

module.exports = {
    getProfesores,
    getProfesorById,
    createProfesor,
    deleteProfesor
}