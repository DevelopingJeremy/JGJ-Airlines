import express from 'express';
import config from './config';
import cors from 'cors';
import router from './routes/products.routes'; // Rutas de productos
import productsRoutes from './routes/products.routes'; // Rutas de productos
import userRoutes from './routes/products.routes'; // Importa las rutas de usuarios

const app = express();

// settings
app.set('port', config.port);

// Habilitar CORS para todas las rutas
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usa las rutas de productos
app.use('/api', router); // Rutas de productos
app.use('/api/Clients', productsRoutes); // Rutas de clientes

// Añadir las nuevas rutas para manejar usuarios
app.use('/api', userRoutes); // Rutas de usuarios


export default app