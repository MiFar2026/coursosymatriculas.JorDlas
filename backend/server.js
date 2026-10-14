
require('dotenv').config()

const app = require('./app')

const PORT = 3000

app.listen(PORT, () => {
  console.log(
    `API Cursos Generales funcionando en http://localhost:${PORT}`
  )
})
