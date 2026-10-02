const db = require('../../config/database')
const getMatriculas = async () => {
    const [rows] = await db.query(`
        SELECT
            matriculas.id,
            alumnado.nombre AS alumno,
            alumnado.apellidos,
            clases.nombre AS clase
        FROM matriculas
        INNER JOIN alumnado
            ON matriculas.alumnado_id = alumnado.id
        INNER JOIN clases
            ON matriculas.clase_id = clases.id
    `)

    return rows
}

const createMatricula = async (matricula) => {
    const {
        alumnado_id,
        clase_id
    } = matricula

    const [result] = await db.query(
        `INSERT INTO matriculas
        (alumnado_id, clase_id)
        VALUES (?, ?)`,
        [
            alumnado_id,
            clase_id
        ]
    )

    return result.insertId
}

const deleteMatricula = async (id) => {
    const [result] = await db.query(
        'DELETE FROM matriculas WHERE id = ?',
        [id]
    )

    return result.affectedRows
}

module.exports = {
    getMatriculas,
    createMatricula,
    deleteMatricula
}