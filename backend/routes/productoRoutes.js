const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { verifyToken, verificarAdmin } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, productoController.crearProducto);
router.get('/', verifyToken, productoController.obtenerProductos);

router.delete('/:id', verifyToken, verificarAdmin, productoController.eliminarProducto);

module.exports = router;
