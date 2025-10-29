// requerir modelo de tareas
const pool = require('../config/db');

// Listar tareas get
const listarTareas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tareas ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear tarea -> POST
const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const result = await pool.query(
      'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *',
      [titulo, descripcion]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exportar controlador de tareas
module.exports = {
  listarTareas,
  crearTarea,
};



const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params; // Se debe tomar el id desde los parámetros
    const { titulo, descripcion, estado } = req.body;

    const result = await pool.query(
      'UPDATE tareas SET titulo=$1, descripcion=$2, estado=$3 WHERE id=$4 RETURNING *',
      [titulo, descripcion, estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE => Eliminar tarea
const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tareas WHERE id=$1', [id]);
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//
// docker compose up --build -d
//docker composer up 
/* frontend -> server (node.js) -> (postgresql)

TAREA 1 -> titulo
TAREA A EJECUTAR ->


*/
