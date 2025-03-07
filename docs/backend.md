# Clase 15/08/2023

## Requerimientos

- Node js
- NPM

## Creación del proyecto



Debe dirigirse a la carpeta correspondiente que quiere iniciar el proyecto y ejecutar el siguiente comando

```
   > npm init
```

Este comando iniciara pidiendo información sobre el proyecto que se quiere realizar, como nombre del paquete, autor, descripción licencia, etc. Seguidamente usted debera agregar o instalar express con el siguiente comando


```
   > npm i express
```

Al terminar el comando se crearan la carpta **node_modules** donde se econtraran las dependencias instaladas, el archivo **package.json** donde encontrará la información del proyecto y/o dependencias instaladas.

## Codificación

Se debe crear el archivo **index.js** en el cual se empezará a digitar el código.

Cabe aclarar que también es necesario ejecutar los siguientes comandos para instalar body-parser y nodemon


```
   > npm i body-parser
   > npm i nodemon
```

En caso tal de no tener instalado nodemon de manera global se debe ejecutar el siguiente comando

``` 
   > npm i -g nodemon
```

Para inicializar el servicio basta con ejecutar el comando 

``` 
   > nodemon .
```

Si el comando genera un error de permisos ejecutar el siguiente comando en Windows power shell (modo administrador) 


```
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```


Para ejecutar el backend se debe crear la base de datos


```
CREATE TABLE Persona (
    documento VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    cel VARCHAR(20),
    per_tipo VARCHAR(20),
    cod_estudiante VARCHAR(20),
    cod_admin VARCHAR(20)
);


-- Creación de la tabla 'categoria'

CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Creación de la tabla 'autor'

CREATE TABLE Autor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Creación de la tabla 'libro' con las llaves foráneas a 'categoria' y 'autor'

CREATE TABLE Libro (
    id SERIAL PRIMARY KEY,
    id_categoria INT REFERENCES Categoria(id),
    id_autor INT REFERENCES Autor(id),
    ubicacion VARCHAR(100),
    descripcion TEXT, name VARCHAR(200)
);

CREATE TABLE Prestamo (
    id SERIAL PRIMARY KEY,
    fecha_ini DATE,
    fecha_fin DATE,
    cod_estudiante VARCHAR(20) REFERENCES Persona(cod_estudiante),
    cod_admin VARCHAR(20) REFERENCES Persona(cod_admin),
    id_libro INT REFERENCES Libro(id)
);

ALTER TABLE Persona
ADD CONSTRAINT cod_estudiante_unique UNIQUE (cod_estudiante),
ADD CONSTRAINT cod_admin_unique UNIQUE (cod_admin);





select * from persona;
select * from Autor;
select * from categoria;
select * from libro;





ALTER TABLE Persona
ADD CONSTRAINT cod_estudiante_unique UNIQUE (cod_estudiante),
ADD CONSTRAINT cod_admin_unique UNIQUE (cod_admin)

select * from persona;

ALTER TABLE Persona
ADD password VARCHAR(100);

-- Insertar persona con per_tipo = "e" (estudiante)
INSERT INTO Persona (documento, nombre, email, cel, per_tipo, cod_estudiante, password)
VALUES ('1004', 'Nombre Estudiante', 'Tuttoperez@gmail.com', '123456789', 'e', '1004', '12345');


select * from persona;
select * from Autor;
ALTER TABLE Persona
ADD password VARCHAR(100);

Insertar persona con per_tipo = "e" (estudiante)
INSERT INTO Persona (documento, nombre, email, cel, per_tipo, cod_estudiante, password)
VALUES ('1004', 'Nombre Estudiante', 'Tuttoperez@gmail.com', '123456789', 'e', '1004', '12345');

-- Insertar persona con per_tipo =  "a" (administrador)
INSERT INTO  Persona (documento,  nombre, email, cel,  per_tipo,  cod_admin,   password) 
VALUES ('1005',   'Nombre Administrador', 'y
Tuttoperez@gmail.com', '987654321', 'a', '1005', 'admin')
;
INSERT INTO  categoria (nombre) 
VALUES ( 'Novela');

INSERT INTO  Autor (nombre)
VALUES ( 'Novela');

INSERT INTO  Autor (nombre) 
VALUES ( 'Maria Dueñas');

```
Configurar el archivo .env

```
###> CONFIG SERVER <####
PORT=3001
###> CONFIG SERVER <####

###> DB_CONNECTION ### 
DB_URL_PG='postgres://postgres:12345@localhost:5432/bd'
###< CONFIGURE SERVER ###

###> SECRET_KEY ###
SECRET_KEY='MiClaveSecreta123'
###< SECRET_KEY ###

```

Situarse en la carpeta Proyecto biblioteca\backend y ejecutar

```
