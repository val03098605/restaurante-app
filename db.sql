CREATE DATABASE restaurante_db;
USE restaurante_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    rol ENUM('admin','empleado') DEFAULT 'empleado'
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10,2),
    creado_por INT,
    FOREIGN KEY (creado_por) REFERENCES users(id)
);

Select * from users;


ALTER TABLE users 
MODIFY rol ENUM('admin','empleado','cliente') DEFAULT 'cliente';


UPDATE users 
SET rol = 'cliente' 
WHERE rol = 'empleado' AND id > 0;

ALTER TABLE users 
MODIFY rol ENUM('admin','cliente') DEFAULT 'cliente';

SELECT id, nombre, email, rol FROM users;

DESCRIBE productos;

INSERT INTO productos (nombre, descripcion, precio, creado_por, imagen) VALUES
('Hamburguesa Clásica', 'Carne 100% res, queso cheddar, lechuga y tomate', 120, 1, 'https://images.unsplash.com/photo-1550547660-d9450f859349'),
('Pizza Pepperoni', 'Pizza artesanal con pepperoni y queso mozzarella', 180, 1, 'https://images.unsplash.com/photo-1548365328-9f547fb0953c'),
('Pasta Alfredo', 'Pasta cremosa con salsa Alfredo y pollo', 150, 1, 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9'),
('Ensalada César', 'Lechuga fresca, crutones y aderezo César', 95, 1, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9'),
('Tacos al Pastor', 'Tacos tradicionales con piña y salsa roja', 110, 1, 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092');

UPDATE productos SET imagen = 'images/hamburguesa-clasica.jpg' WHERE id = 2;

UPDATE productos SET imagen = 'images/pizza-peperoni.jpg' WHERE id = 3;

UPDATE productos SET imagen = 'images/pasta-alfredo.jpg' WHERE id = 4;

UPDATE productos SET imagen = 'images/ensalada-cesar.jpg' WHERE id = 5;

UPDATE productos SET imagen = 'images/tacos-pastor.jpg' WHERE id = 6;




