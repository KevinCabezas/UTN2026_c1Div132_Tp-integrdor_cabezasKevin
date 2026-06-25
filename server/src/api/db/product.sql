CREATE TABLE product_lines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO product_lines (name) VALUES ('marron'), ('gris');

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT,
    line_id INT,
    state BOOLEAN NOT NULL DEFAULT TRUE,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (line_id) REFERENCES product_lines(id)
);


-- 4. Tabla de Ventas (Guarda los datos globales de la compra)
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL, -- Nombre del usuario temporal
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla Intermedia / Pivot (Representa la relación Muchos a Muchos)
-- Conecta productos con ventas y maneja las cantidades del carrito.
CREATE TABLE product_sale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,     -- Parámetro cantidad del requerimiento
    price_unit DECIMAL(10, 2) NOT NULL,  -- Precio del producto congelado al momento de la compra
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);