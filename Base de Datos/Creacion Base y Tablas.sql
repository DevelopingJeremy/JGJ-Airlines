CREATE DATABASE BD_JGJ_Airlines;

USE BD_JGJ_Airlines;

-- Creación de las tablas Clientes, Destinos, Pagos, Factura Reserva.
CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY IDENTITY (1,1) not null,
    nombre_cliente varchar(100) not null,
    apellido1_cliente varchar(50) not null,
    apellido2_cliente varchar(50) not null,
    email_cliente varchar(100) UNIQUE not null,
    contraseña_cliente varchar(255) not null, -- Para almacenar el hash de la contraseña
    fecha_nacimiento_cliente DATE not null,
	isAdmin VARCHAR(20) not null
);

CREATE TABLE Destinos (
    id_destino INT PRIMARY KEY IDENTITY (1, 1) not null,
    nombre_destino varchar(100) not null,
    descripcion_destino varchar(600) not null,
    precio DECIMAL (10,2) not null
);

CREATE TABLE Pagos (
    id_pago INT PRIMARY KEY IDENTITY (1,1) not null,
    id_cliente INT,
    email_facturacion VARCHAR(100) UNIQUE not null,
    numero_tarjeta VARCHAR(16) not null, -- Para manejar números de tarjeta
    fecha_expiracion DATE not null,
    cvv INT not null,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

CREATE TABLE FacturaReserva (
    id_factura_reserva INT PRIMARY KEY IDENTITY (1,1) not null,
    id_pago INT,
    id_destino INT, -- Relacionado con la tabla Destinos
    origen_reserva VARCHAR(80) not null, -- Opcional: podría tener una tabla de aeropuertos
    fecha_ida_reserva DATE not null,
    fecha_vuelta_reserva DATE not null,
    pasajeros_reserva INT CHECK (pasajeros_reserva > 0) not null,
    FOREIGN KEY (id_pago) REFERENCES Pagos(id_pago),
    FOREIGN KEY (id_destino) REFERENCES Destinos(id_destino)
);