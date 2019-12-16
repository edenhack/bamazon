CREATE DATABASE IF NOT EXISTS bamazon_db;
USE bamazon_db;

CREATE TABLE IF NOT EXISTS products(
	product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    , product_name VARCHAR(30)
    , department_name VARCHAR(30)
    , price_customer DECIMAL(10,2) NOT NULL
    , stock_quantity INTEGER NOT NULL
);

INSERT INTO products (product_name, department_name,
	price_customer, stock_quantity)
VALUES ("Halo Reach", "Video Games", 49.99, 100)
	, ("Hair Spray", "Women's Care", 13.45, 300)
    , ("Mortal Kombat", "Video Games", 49.99, 50)
    , ("Eyeliner", "Women's Care", 24.99, 150)
	, ("Cologne", "Men's Care", 35.99, 75)
    , ("Deodorant", "Men's Care", 9.99, 350)
    , ("Toothpaste", "General Care", 7.99, 500)
    , ("Shampoo", "General Care", 6.99, 320)
    , ("Conditioner", "General Care", 6.99, 300)
    , ("Floss", "General Care", 3.50, 450);

