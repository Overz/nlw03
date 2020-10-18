import 'express-async-errors';
import express from 'express';
import OrphanagesController from './controller/OrphanagesController';
import { errorHandler } from './middleware/handler';
import multer from 'multer';
import { multerConfig } from './config/multer';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, 'tmp', 'uploads')));
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

const upload = multer(multerConfig);

app.get('/orphanages', OrphanagesController.listar);
app.post('/orphanages', upload.array('images'), OrphanagesController.criar);
app.get('/orphanages/:id', OrphanagesController.exibir);
app.put('/orphanages/:id', OrphanagesController.atualizar);
app.delete('/orphanages/:id', OrphanagesController.excluir);

// app.all('*', async () => {
//   throw new NotFoundError();
// });

app.use(errorHandler);

export { app };
