const express = require('express');
const router = express.Router();
const { listarTareas, crearTarea, actualizarTarea, eliminarTarea } = require('../controllers/taskController');

// Definir rutas para las tareas
router.get('/tasks', listarTareas); // Ruta para el GET
router.post('/tasks', crearTarea); // Ruta para el POST
router.put('/tasks/:id', actualizarTarea); // Ruta para el PUT
router.delete('/tasks/:id', eliminarTarea); // Ruta para el DELETE

module.exports = router;
