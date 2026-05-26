DROP TABLE IF EXISTS users, servicios;

CREATE TABLE IF NOT EXISTS users (
  id serial NOT NULL PRIMARY KEY,
  name varchar(30) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(72) NOT NULL,
  creation_date timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password)
VALUES
  ('Zapato', 'zapato@example.com', 'INVALID_PASSWORD'),
  ('Chotobuque', 'chotobuque@example.com', 'INVALID_PASSWORD'),
  ('Alfiler', 'alfiler@example.com', 'INVALID_PASSWORD'),
  ('Troca', 'troca@example.com', 'INVALID_PASSWORD');

CREATE TABLE IF NOT EXISTS servicios (
  id serial NOT NULL PRIMARY KEY,
  titulo varchar(100) NOT NULL,
  descripcion text NOT NULL,
  fecha date DEFAULT CURRENT_DATE,
  categoria varchar(15)
);

INSERT INTO servicios (titulo, descripcion, categoria)
VALUES
  ('Servicio 1', 'Descripción del servicio 1', 'Asistencia'),
  ('Servicio 2', 'Descripción del servicio 2', 'Entretenimiento'),
  ('Servicio 3', 'Descripción del servicio 3', 'Autonomía'),
  ('Servicio 4', 'Descripción del servicio 4', 'Educación');
