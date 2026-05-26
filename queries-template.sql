DROP TABLE IF EXISTS servicios;

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
