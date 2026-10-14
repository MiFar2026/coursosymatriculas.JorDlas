
const Database = require('better-sqlite3')
const fs = require('node:fs')
const path = require('node:path')

const dataDir = path.join(__dirname, '..', 'data')

fs.mkdirSync(dataDir, {
  recursive: true,
  mode: 0o700
})

const dbPath = path.join(dataDir, 'voluntarios.sqlite')
const db = new Database(dbPath)

// Evita que otros procesos esperen indefinidamente por un bloqueo.
db.pragma('busy_timeout = 5000')

// Garantiza integridad referencial si añadimos relaciones en el futuro.
db.pragma('foreign_keys = ON')

// Solo si el directorio y sus permisos están protegidos.
// WAL mejora la concurrencia, pero genera archivos auxiliares.
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS voluntarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    anyo_nacimiento INTEGER NOT NULL,
    lugar_residencia TEXT NOT NULL,
    documento_identidad TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT NOT NULL,
    tarea TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    privacidad INTEGER NOT NULL DEFAULT 0
      CHECK (privacidad IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (
      strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
    )
  );

  CREATE INDEX IF NOT EXISTS idx_voluntarios_fecha
  ON voluntarios(created_at);

  CREATE INDEX IF NOT EXISTS idx_voluntarios_email
  ON voluntarios(email);
`)

module.exports = db
