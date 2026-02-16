const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productoRoutes = require('./routes/productoRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   SERVIR FRONTEND
========================= */
app.use(express.static(path.join(__dirname, '../frontend')));

/* =========================
   RUTAS API
========================= */

// Autenticación
app.use('/api/auth', authRoutes);

// Productos
app.use('/api/productos', productoRoutes);

// Ruta protegida de prueba
app.get('/api/protegida', verifyToken, (req, res) => {
    res.json({
        message: 'Ruta protegida funcionando',
        usuario: req.user
    });
});

// Ruta de prueba API
app.get('/api', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.send('API Restaurante funcionando y MySQL conectado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error conectando a MySQL');
    }
});

module.exports = app;
