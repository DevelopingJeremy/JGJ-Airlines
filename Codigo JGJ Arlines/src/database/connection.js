import sql from 'mssql'
import config from '../config'

const dbSettings = {
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    database: config.dbDatabase,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}
// DESKTOP-VBEHNJ1
export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        console.warn("Conección exitosa a la BD");
        
        return pool
    } catch (err) {
        console.log(err);
    }
}

export { sql };