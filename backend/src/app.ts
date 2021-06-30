import 'express-async-errors';
import express, { Request, Response } from 'express';
import OrphanagesController from './controller/OrphanagesController';
import { errorHandler } from './middleware/handler';
import multer from 'multer';
import { multerConfig } from './config/multer';
import path from 'path';

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, 'tmp', 'uploads')));

const upload = multer(multerConfig);

app.get('/api/orphanages', OrphanagesController.listar);
app.post('/api/orphanages', upload.array('images'), OrphanagesController.criar);
app.get('/api/orphanages/:id', OrphanagesController.exibir);
app.put('/api/orphanages/:id', OrphanagesController.atualizar);
app.delete('/api/orphanages/:id', OrphanagesController.excluir);
app.get('/api/orphanages/ping', OrphanagesController.ping);

app.all('*', async (req: Request, res: Response) => {
  res.status(404).send('404 Not Found');
});

app.use(errorHandler);

export { app };
