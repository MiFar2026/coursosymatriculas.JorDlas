
const pool = require('../config/database');

const DIAS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

// Lista los grupos disponibles para configurar sus horarios.

async function getGrupos(req, res) {
  try {
    const [grupos] = await pool.execute(`
      SELECT
        g.id,
        g.nombre,
        g.curso_id,
        g.escuela_id,
        g.profesor_id,
        g.aula,
        g.turno,
        g.activo,

        e.nombre AS nombre_escuela,

        c.nombre AS nombre_curso,
        c.idioma,
        c.nivel

      FROM grupos g

      INNER JOIN escuelas e
        ON e.id = g.escuela_id

      INNER JOIN cursos c
        ON c.id = g.curso_id

      WHERE g.activo = 1
        AND e.activa = 1
        AND c.activo = 1

      ORDER BY
        e.nombre,
        c.id,
        FIELD(g.turno, 'Mañana', 'Tarde')
    `);

    res.json(grupos);

  } catch (error) {
    console.error('Error al consultar grupos:', error);

    res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar los grupos.'
    });
  }
}


// Consulta el horario de un grupo.
// Si no se indica grupo_id y no hay grupos activos,
// devuelve una lista vacía en lugar de un error 400.
async function getHorarios(req, res) {
  console.log('GET HORARIOS NUEVO', req.originalUrl);

  const grupoId = Number(req.query.grupo_id);

  
// async function getHorarios(req, res) {
//const grupoId = Number(req.query.grupo_id);


  try {
    // Si no se ha seleccionado ningún grupo, comprobar
    // si existen grupos activos antes de decidir la respuesta.
    if (
      req.query.grupo_id === undefined ||
      req.query.grupo_id === ''
    ) {
      const [gruposActivos] = await pool.execute(
        'SELECT id FROM grupos WHERE activo = 1 LIMIT 1'
      );

      if (gruposActivos.length === 0) {
        return res.json([]);
      }

      return res.status(400).json({
        ok: false,
        mensaje: 'Selecciona un grupo para consultar sus horarios.'
      });
    }

    if (!Number.isInteger(grupoId) || grupoId < 1) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El grupo seleccionado no es válido.'
      });
    }

    const [grupos] = await pool.execute(
      'SELECT id FROM grupos WHERE id = ? AND activo = 1',
      [grupoId]
    );

    if (grupos.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El grupo no existe o está inactivo.'
      });
    }

    const [filas] = await pool.execute(
      `SELECT id, grupo_id, dia_semana, hora_inicio, hora_fin,
              activo, cerrado, actualizado_en
       FROM horarios
       WHERE grupo_id = ?
       ORDER BY FIELD(
         dia_semana,
         'Lunes', 'Martes', 'Miércoles', 'Jueves',
         'Viernes', 'Sábado', 'Domingo'
       )`,
      [grupoId]
    );

    const resultado = DIAS.map(dia => {
      const fila = filas.find(h => h.dia_semana === dia);

      if (!fila) {
        return {
          id: null,
          grupo_id: grupoId,
          dia_semana: dia,
          hora_inicio: '09:00',
          hora_fin: '18:00',
          activo: false,
          cerrado: true,
          configurado: false
        };
      }

      return {
        ...fila,
        dia_semana: dia,
        hora_inicio: String(fila.hora_inicio).slice(0, 5),
        hora_fin: String(fila.hora_fin).slice(0, 5),
        activo: Boolean(fila.activo),
        cerrado: Boolean(fila.cerrado),
        configurado: true
      };
    });

    return res.json(resultado);
  } catch (error) {
    console.error('Error al consultar horarios:', error);

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron consultar los horarios.'
    });
  }
}

function horaValida(hora) {
  return typeof hora === 'string' &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(hora);
}

// Solo se debe invocar desde una ruta protegida con adminAuth.
async function guardarHorarios(req, res) {
  const grupoId = Number(req.body.grupo_id);
  const horarios = req.body.horarios;

  if (!Number.isInteger(grupoId) || grupoId < 1) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El grupo seleccionado no es válido.'
    });
  }

  if (!Array.isArray(horarios) || horarios.length !== 7) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Debes enviar los siete días de la semana.'
    });
  }

  const diasRecibidos = horarios.map(h => h.dia_semana);

  if (
    new Set(diasRecibidos).size !== 7 ||
    !DIAS.every(dia => diasRecibidos.includes(dia))
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Los días enviados no son válidos.'
    });
  }

  for (const horario of horarios) {
    if (typeof horario.cerrado !== 'boolean') {
      return res.status(400).json({
        ok: false,
        mensaje: `El estado de ${horario.dia_semana} no es válido.`
      });
    }

    if (
      !horario.cerrado &&
      (
        !horaValida(horario.hora_inicio) ||
        !horaValida(horario.hora_fin) ||
        horario.hora_inicio >= horario.hora_fin
      )
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: `Revisa las horas de ${horario.dia_semana}. La hora de cierre debe ser posterior a la apertura.`
      });
    }
  }

  let conexion;

  try {
    conexion = await pool.getConnection();
    await conexion.beginTransaction();

    const [grupos] = await conexion.execute(
      'SELECT id FROM grupos WHERE id = ? AND activo = 1',
      [grupoId]
    );

    if (grupos.length === 0) {
      await conexion.rollback();

      return res.status(404).json({
        ok: false,
        mensaje: 'El grupo no existe o está inactivo.'
      });
    }

    for (const horario of horarios) {
      // La tabla exige hora_inicio < hora_fin incluso si está cerrado.
      // Por eso guardamos un intervalo válido y usamos cerrado = 1.
      const inicio = horario.cerrado
        ? '09:00:00'
        : `${horario.hora_inicio}:00`;

      const fin = horario.cerrado
        ? '18:00:00'
        : `${horario.hora_fin}:00`;

      const [existentes] = await conexion.execute(
        `SELECT id
         FROM horarios
         WHERE grupo_id = ? AND dia_semana = ?
         ORDER BY id
         LIMIT 1`,
        [grupoId, horario.dia_semana]
      );

      if (existentes.length > 0) {
        await conexion.execute(
          `UPDATE horarios
           SET hora_inicio = ?,
               hora_fin = ?,
               activo = 1,
               dia = ?,
               cerrado = ?
           WHERE id = ?`,
          [
            inicio,
            fin,
            horario.dia_semana,
            horario.cerrado ? 1 : 0,
            existentes[0].id
          ]
        );
      } else {
        await conexion.execute(
          `INSERT INTO horarios
           (grupo_id, dia_semana, hora_inicio, hora_fin,
            activo, dia, cerrado)
           VALUES (?, ?, ?, ?, 1, ?, ?)`,
          [
            grupoId,
            horario.dia_semana,
            inicio,
            fin,
            horario.dia_semana,
            horario.cerrado ? 1 : 0
          ]
        );
      }
    }

    await conexion.commit();

    res.json({
      ok: true,
      mensaje: 'Los horarios se han guardado correctamente.'
    });
  } catch (error) {
    if (conexion) {
      await conexion.rollback();
    }

    console.error('Error al guardar horarios:', error);

    res.status(500).json({
      ok: false,
      mensaje: 'No se pudieron guardar los horarios.'
    });
  } finally {
    if (conexion) {
      conexion.release();
    }
  }
}


// Consulta el horario del grupo al que pertenece el alumno autenticado.
async function getHorariosAlumno(req, res) {
  try {
    const [matriculas] = await pool.execute(
      `SELECT m.grupo_id
       FROM matriculas m
       INNER JOIN grupos g ON g.id = m.grupo_id
       WHERE m.alumno_id = ?
         AND m.estado = 'ACTIVA'
         AND g.activo = 1
       ORDER BY m.fecha_matricula DESC, m.id DESC
       LIMIT 1`,
      [req.alumnoId]
    );

    if (matriculas.length === 0) {
      return res.json({
        ok: true,
        datos: [],
        mensaje: 'No tienes un grupo activo asignado.'
      });
    }

    const grupoId = matriculas[0].grupo_id;

    const [horarios] = await pool.execute(
      `SELECT id, grupo_id, dia_semana, hora_inicio, hora_fin
       FROM horarios
       WHERE grupo_id = ?
         AND activo = 1
       ORDER BY FIELD(
         dia_semana,
         'Lunes', 'Martes', 'Miércoles', 'Jueves',
         'Viernes', 'Sábado', 'Domingo'
       ), hora_inicio`,
      [grupoId]
    );

    return res.json({
      ok: true,
      datos: horarios.map(horario => ({
        ...horario,
        hora_inicio: String(horario.hora_inicio).slice(0, 5),
        hora_fin: String(horario.hora_fin).slice(0, 5)
      }))
    });
  } catch (error) {
    console.error('Error al consultar el horario del alumno:', error);

    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo consultar tu horario.'
    });
  }
}


module.exports = {
  getGrupos,
  getHorarios,
  guardarHorarios,
  getHorariosAlumno
};