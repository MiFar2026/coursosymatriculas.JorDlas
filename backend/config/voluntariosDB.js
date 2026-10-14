
const mysql = require('mysql2/promise')

const voluntariosDB = mysql.createPool({
  host: process.env.VOL_DB_HOST || 'localhost',
  port: Number(process.env.VOL_DB_PORT || 3306),
  user: process.env.VOL_DB_USER,
  password: process.env.VOL_DB_PASSWORD,
  database: process.env.VOL_DB_NAME || 'exaequo_voluntarios',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 20,
  charset: 'utf8mb4'
})

module.exports = voluntariosDB
