--Users Table--
CREATE DATABASE database_vacuna;

USE database_vacuna;

-- TABLE USER
CREATE TABLE users(
  id INT(11) NOT NULL,
  curp VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  name VARCHAR(100) NOT NULL,
  apellidoMaterno VARCHAR(100) NOT NULL,
  apellidoPaterno VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  calle VARCHAR(50) NOT NULL,
  N_ext INT(11),
  N_int INT(11),
  Colonia VARCHAR(50) NOT NULL,
  Municipio VARCHAR(50) NOT NULL,
  estado VARCHAR(50) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;