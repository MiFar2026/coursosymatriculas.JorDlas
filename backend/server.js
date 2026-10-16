
require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
  console.log(`API Cursos Generales funcionando en http://localhost:${PORT}`)
})
