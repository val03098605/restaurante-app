require('dotenv').config();
const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        // Crear tablas automáticamente si no existen
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                password VARCHAR(255),
                rol ENUM('admin','cliente') DEFAULT 'cliente'
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                descripcion TEXT,
                precio DECIMAL(10,2),
                creado_por INT,
                imagen VARCHAR(255)
            )
        `);

        console.log("Tablas verificadas correctamente");

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });

    } catch (error) {
        console.error("Error iniciando servidor:", error);
    }
}

iniciarServidor();
