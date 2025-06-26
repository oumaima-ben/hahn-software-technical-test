

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       first_name VARCHAR(255) NOT NULL,
                       last_name VARCHAR(255) NOT NULL,
                       adresse VARCHAR(255),
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       role VARCHAR(50) NOT NULL
);

CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          price NUMERIC(10, 2) NOT NULL,
                          stock_quantity INT NOT NULL
);

CREATE TABLE orders (
                        id BIGSERIAL PRIMARY KEY,
                        user_id BIGINT,
                        item_description VARCHAR(255),
                        total_amount NUMERIC(10, 2),
                        created_at TIMESTAMP,
                        updated_at TIMESTAMP,
                        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
                             id BIGSERIAL PRIMARY KEY,
                             order_id BIGINT NOT NULL,
                             product_id BIGINT,
                             quantity INT NOT NULL,
                             price NUMERIC(10, 2) NOT NULL,
                             CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
                             CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE SET NULL
);


-- Insert some products.
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
