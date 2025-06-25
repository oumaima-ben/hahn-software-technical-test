-- This script defines the complete database schema and will be run on startup.

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;


-- Create the 'users' table for storing user information and credentials.
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create the 'products' table for storing product information.
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INT NOT NULL
);

-- Create the 'orders' table to store customer orders.
-- It has a foreign key relationship to the 'users' table.
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    order_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the 'order_items' table to link products to orders (many-to-many relationship).
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE SET NULL
);


----------------------------
-- This script will be executed on application startup to populate the database.
-- It will only run if the tables are empty to avoid inserting duplicate data.

-- Note: Passwords are encrypted using BCrypt. The plain text for both is "password123".

-- Insert an ADMIN user if one doesn't already exist
INSERT INTO users (first_name, last_name, email, password, role)
SELECT 'Admin', 'User', 'admin@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07M2o9TeiVufa2dGmm', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com');

-- Insert a regular USER if one doesn't already exist
INSERT INTO users (first_name, last_name, email, password, role)
SELECT 'John', 'Doe', 'john.doe@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07M2o9TeiVufa2dGmm', 'USER'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'john.doe@example.com');


-- Insert some sample products if the products table is empty
INSERT INTO products (name, description, price, stock_quantity)
SELECT 'Quantum Laptop Pro', 'A sleek and powerful laptop with 16GB RAM and 1TB SSD.', 1499.99, 50
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Quantum Laptop Pro');

INSERT INTO products (name, description, price, stock_quantity)
SELECT 'Ergo-Mechanical Keyboard', 'A split-layout ergonomic keyboard with silent tactile switches.', 175.50, 75
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Ergo-Mechanical Keyboard');

INSERT INTO products (name, description, price, stock_quantity)
SELECT '4K Ultra-Wide Monitor', 'A 34-inch curved monitor for an immersive experience.', 799.00, 30
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = '4K Ultra-Wide Monitor');

INSERT INTO products (name, description, price, stock_quantity)
SELECT 'Silent Wireless Mouse', 'An ergonomic mouse with silent clicks and a long-lasting battery.', 49.99, 150
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Silent Wireless Mouse');
