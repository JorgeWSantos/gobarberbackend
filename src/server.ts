import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import './database';
import UploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(UploadConfig.directory));
app.use(routes);

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.status_code)
      .json({ status: 'error', message: error.message });
  }

  return res
    .status(500)
    .json({ statue: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log('✌ backend started');
});
