const validarClase = (req, res, next) => {

    const {
        nombre,
        idioma,
        nivel
    } = req.body

    if (!nombre || !idioma || !nivel) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios'
        })
    }

    next()
}

module.exports = validarClase