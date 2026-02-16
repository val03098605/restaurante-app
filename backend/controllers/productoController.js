const Producto = require('../models/productoModel');

exports.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen } = req.body;
        const creado_por = req.user.id;

        await Producto.crear(nombre, descripcion, precio, creado_por, imagen);

        res.status(201).json({ message: 'Producto creado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const [productos] = await Producto.obtenerTodos();
        res.json(productos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        await Producto.eliminar(id);

        res.json({ message: 'Producto eliminado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};
