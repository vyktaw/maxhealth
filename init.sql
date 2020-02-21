CREATE DATABASE max_api;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phone VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS events (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  event_date DATETIME NOT NULL,
  event_venue VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  ID SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  order_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS event_register (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  event_date DATE NOT NULL
); 

INSERT INTO users (username, email, phone) VALUES
    ('Victor', 'victo.okon.imeh@gmail.com', '08022889321');