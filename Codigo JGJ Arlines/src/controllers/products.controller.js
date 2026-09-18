import { getConnection, sql, queries } from "../database";

export const getClient = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllClients);
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createNewClient = async (req, res) => {
    const { nombre_cliente, apellido1_cliente, apellido2_cliente, email_cliente, contraseña_cliente, fecha_nacimiento_cliente, isAdmin } = req.body;

    if (nombre_cliente == null || apellido1_cliente == null || apellido2_cliente == null || email_cliente == null || contraseña_cliente == null || fecha_nacimiento_cliente == null || isAdmin == null) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
    }

    try {
        const pool = await getConnection();

        await pool.request()
            .input('nombre_cliente', sql.VarChar, nombre_cliente)
            .input('apellido1_cliente', sql.VarChar, apellido1_cliente)
            .input('apellido2_cliente', sql.VarChar, apellido2_cliente)
            .input('email_cliente', sql.VarChar, email_cliente)
            .input('contraseña_cliente', sql.VarChar, contraseña_cliente)
            .input('fecha_nacimiento_cliente', sql.Date, fecha_nacimiento_cliente)
            .input('isAdmin', sql.VarChar, isAdmin)
            .query(queries.addNewClient);

        console.log(nombre_cliente, apellido1_cliente, apellido2_cliente, email_cliente, contraseña_cliente, fecha_nacimiento_cliente, isAdmin);

        res.json({ nombre_cliente, apellido1_cliente, apellido2_cliente, email_cliente, contraseña_cliente, fecha_nacimiento_cliente, isAdmin });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getClientById = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_Cliente', id)
            .query(queries.getClientsById);

        console.log(result);
        res.send(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteClientById = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('id_cliente', id)
            .query(queries.deleteClient);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getTotalClients = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(queries.getTotalClients);

        console.log(result);
        res.json(result.recordset[0]['']);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateClientById = async (req, res) => {
    const { nombre_cliente, apellido1_cliente, apellido2_cliente, email_cliente, contraseña_cliente, fecha_nacimiento_cliente, isAdmin } = req.body;
    const { id } = req.params;

    if (nombre_cliente == null || apellido1_cliente == null || apellido2_cliente == null || email_cliente == null || contraseña_cliente == null || fecha_nacimiento_cliente == null || isAdmin == null) {        
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('nombre_cliente', sql.VarChar, nombre_cliente)
            .input('apellido1_cliente', sql.VarChar, apellido1_cliente)
            .input('apellido2_cliente', sql.VarChar, apellido2_cliente)
            .input('email_cliente', sql.VarChar, email_cliente)
            .input('contraseña_cliente', sql.VarChar, contraseña_cliente)
            .input('fecha_nacimiento_cliente', sql.Date, fecha_nacimiento_cliente)
            .input('isAdmin', sql.VarChar, isAdmin)
            .input('id_cliente', sql.Int, id)
            .query(queries.updateClientById);

        console.log(result);
        res.json({ nombre_cliente, apellido1_cliente, apellido2_cliente, email_cliente, contraseña_cliente, fecha_nacimiento_cliente, isAdmin });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getClientByLogin = async (req, res) => {
    const { email_cliente, contraseña_cliente } = req.body;

    // Validar que ambos campos estén presentes
    if (email_cliente == null || contraseña_cliente == null) {        
        return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('email_cliente', sql.VarChar, email_cliente)
            .input('contraseña_cliente', sql.VarChar, contraseña_cliente)
            .query(queries.loginUser);

        // Verificar si result y result.recordset existen
        if (!result || !result.recordset) {
            return res.status(500).json({ msg: "Error en la consulta a la base de datos" });
        }

        // Verificar si se encontró un cliente
        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: "Usuario o contraseña incorrectas" });
        }

        // Asumiendo que la contraseña está almacenada de manera segura, debes comparar
        const client = result.recordset[0];

        if (client.contraseña_cliente !== contraseña_cliente) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        // Si se encontró el cliente y la contraseña es correcta
        res.json({ msg: "Inicio de sesión exitoso", client });
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).send(error.message);
    }
};

export const seeClientByEmail = async (req, res) => {
    const { email_cliente } = req.body;

    // Validar que ambos campos estén presentes
    if (email_cliente == null) {        
        return res.status(400).json({ msg: "Bad Request. Please fill the field" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('email_cliente', sql.VarChar, email_cliente)
            .query(queries.seeUser);

        // Verificar si result y result.recordset existen
        if (!result || !result.recordset) {
            return res.status(500).json({ msg: "Error en la consulta a la base de datos" });
        }

        // Verificar si se encontró un cliente
        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: "Usuario incorrecto" });
        }

        // Asumiendo que la contraseña está almacenada de manera segura, debes comparar
        const client = result.recordset[0];

        // Si se encontró el cliente y la contraseña es correcta
        res.json({ msg: "Verificacion exitosa", client });
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).send(error.message);
    }
};