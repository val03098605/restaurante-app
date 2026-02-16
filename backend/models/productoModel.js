const db = require('../config/db');

const Producto = {

    crear: async (nombre, descripcion, precio, creado_por, imagen) => {
        return await db.query(
            'INSERT INTO productos (nombre, descripcion, precio, creado_por, imagen) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, creado_por, imagen]
        );
    },

    obtenerTodos: async () => {
        return await db.query('SELECT * FROM productos');
    },

    eliminar: async (id) => {
        return await db.query('DELETE FROM productos WHERE id = ?', [id]);
    }

};

module.exports = Producto;
