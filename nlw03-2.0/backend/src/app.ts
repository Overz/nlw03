import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import * as env from 'env-var';
import path from 'path';
import { criarOrfanato } from './routes/orfanato/criar-orfanato';
import { currentUser } from './middlewares/current-user';
import { envRequired } from './util/constants';

const app = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  currentUser(
    env.get('JWT_KEY').required(envRequired).default('JWT_KEY').asString()
  )
);
app.use('/uploads', express.static(path.resolve(__dirname, 'tmp', 'uploads')));

// Rotas
app.use(criarOrfanato);

app.all('*', async (req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

export { app };
