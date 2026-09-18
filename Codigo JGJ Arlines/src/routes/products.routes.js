import {Router} from "express";

import { createNewClient, deleteClientById, getClient, getClientById, getTotalClients, updateClientById, getClientByLogin, seeClientByEmail } from "../controllers/products.controller";


const router = Router();

router.get('/Clients', getClient)

router.get('/Clients/:id', getClientById)

router.post('/buscar-usuario', seeClientByEmail);

router.get('/Clients/count', getTotalClients)

router.post('/api/login', getClientByLogin)

router.post('/api/Clients', createNewClient);

router.delete('/eliminar-usuario/:id', deleteClientById)

router.put('/editar-usuario/:id', updateClientById)

export default router