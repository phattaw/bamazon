
--   item_id INT NOT NULL AUTO_INCREMENT,
--   product_name VARCHAR(100) NULL,
--   department_name VARCHAR(100) NULL,
--   price DECIMAL(10,2) NULL,
--   stock_quantity INT NULL,
--   PRIMARY KEY (item_id)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dish Soap", "Housewares", 5.50, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laundry detergent", "Housewares", 10.50, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rattle trap", "Fishing", 9.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Whopper flopper", "Fishing", 12.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping bag", "Outdoors", 55.75, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camping stove", "Outdoors", 150.99, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Outdoors", 105.50, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishing rod", "Fishing", 75.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Floor cleaner", "Housewares", 5.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog food", "Pet", 45.33, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog treats", "Pet", 8.98, 1000);

SELECT * FROM products;