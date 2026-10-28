
const pool = require('../config/database')

// Consulta global de horas asistidas por alumno,
// separadas por escuela y grupo.
// Solo contabiliza sesiones REALIZADAS.
async function getResumenHorasAsistencia(req, res) {
  try {
    const [datos] = await pool.execute(
      `SELECT
         a.id AS alumno_id,
         a.nombre,
         a.apellidos,
         e.nombre AS nombre_escuela,
         g.id AS grupo_id,
         g.nombre AS nombre_grupo,
         COALESCE(t.total_minutos, 0) AS total_minutos,
         ROUND(COALESCE(t.total_minutos, 0) / 60, 2) AS total_horas
       FROM (
         SELECT DISTINCT alumno_id, grupo_id
         FROM matriculas
       ) m
       INNER JOIN alumnos a
         ON a.id = m.alumno_id
       INNER JOIN grupos g
         ON g.id = m.grupo_id
       INNER JOIN escuelas e
         ON e.id = g.escuela_id
       LEFT JOIN (
         SELECT
           ar.alumno_id,
           s.grupo_id,
           SUM(ar.minutos_asistidos) AS total_minutos
         FROM asistencia_registros ar
         INNER JOIN asistencia_sesiones s
           ON s.id = ar.sesion_id
         WHERE s.estado = 'REALIZADA'
         GROUP BY ar.alumno_id, s.grupo_id
       ) t
         ON t.alumno_id = a.id
         AND t.grupo_id = g.id
       ORDER BY
         e.nombre,
         g.nombre,
         a.apellidos,
         a.nombre`
    )

    return res.json({
      ok: true,
      datos
    })
  } catch (error) {
    console.error(
      'Error al consultar las horas globales de asistencia:',
      error
    )

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar las horas de asistencia.'
    })
  }
}

module.exports = {
  getResumenHorasAsistencia
}
