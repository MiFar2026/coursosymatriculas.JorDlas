const validarProfesor = (req, res, next) => {

    const {
        tipo_documento,
        documento,
        nombre,
        apellidos
    } = req.body

    if (!tipo_documento || !documento || !nombre || !apellidos) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios'
        })
    }

    next()
}

module.exports = validarProfesor