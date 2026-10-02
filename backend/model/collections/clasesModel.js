const db = require('../../config/database')
const getClases = async () => {
    const [rows] = await db.query(
        'SELECT * FROM clases'
    )

    return rows
}

const getClaseById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM clases WHERE id = ?',
        [id]
    )

    return rows[0]
}

const getClasesAlfabetizacion = async () => {
    const [rows] = await db.query(
        "SELECT * FROM clases WHERE idioma = 'Alfabetización'"
    )

    return rows
}

const createClase = async (clase) => {
    const {
        nombre,
        idioma,
        nivel,
        horario,
        aula
    } = clase

    const [result] = await db.query(
        `INSERT INTO clases
        (nombre, idioma, nivel, horario, aula)
        VALUES (?, ?, ?, ?, ?)`,
        [
            nombre,
            idioma,
            nivel,
            horario,
            aula
        ]
    )

    return result.insertId
}

const deleteClase = async (id) => {
    const [result] = await db.query(
        'DELETE FROM clases WHERE id = ?',
        [id]
    )

    return result.affectedRows
}

module.exports = {
    getClases,
    getClaseById,
    getClasesAlfabetizacion,
    createClase,
    deleteClase
}