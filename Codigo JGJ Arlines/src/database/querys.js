import { createNewProduct, getProductsById, updateProductById } from "../controllers/products.controller";

export const queries = {
    getAllClients: 'SELECT * FROM Clientes',
    
    addNewClient: 'INSERT INTO clientes(nombre_cliente, apellido1_cliente, apellido2_cliente,email_cliente, contraseña_cliente, fecha_nacimiento_cliente, isAdmin) VALUES (@nombre_cliente, @apellido1_cliente, @apellido2_cliente, @email_cliente, @contraseña_cliente, @fecha_nacimiento_cliente, @isAdmin)',

    getClientsById: 'SELECT * FROM Clientes WHERE id_cliente = @id_cliente',

    deleteClient: 'DELETE FROM Clientes WHERE id_cliente = @id_cliente',

    updateClientById: 'UPDATE Clientes SET nombre_cliente = @nombre_cliente,apellido1_cliente = @apellido1_cliente, apellido2_cliente = @apellido2_cliente, email_cliente = @email_cliente, contraseña_cliente = @contraseña_cliente,fecha_nacimiento_cliente = @fecha_nacimiento_cliente,isAdmin = @isAdmin WHERE id_cliente = @id_cliente',

    loginUser: 'SELECT * FROM Clientes WHERE email_cliente = @email_cliente AND contraseña_cliente = @contraseña_cliente',

    seeUser: 'SELECT * FROM Clientes WHERE email_cliente = @email_cliente'
    
}