const express = require('express')
const routes = require('./routes')
const testing = require('./test')

const app = express()

app.use(express.json())

app.use(testing)

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Cursos Generales funcionando correctamente'
    })
})

app.use('/api', routes)

module.exports = app