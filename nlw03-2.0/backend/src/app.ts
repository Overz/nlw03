import express, { Request, Response } from 'express';
import 'express-async-errors';

const app = express();

app.use('/', async (req: Request, res: Response) => {
  res.json({ ok: true });
});

export { app };
