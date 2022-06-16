import express, { ErrorRequestHandler, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import passport from 'passport';
import apiRoutes from './routes/api';

dotenv.config();
const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({ extended: true }));
//
server.use(express.json());

server.use(passport.initialize());

//endpoint para testar comunicação
server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
  res.status(404).send('Endpoint não encontrado!');
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(400); // Bad Request
  }
  if (err.message) {
    res.json({ error: err.message });
  } else {
    res.json({ error: 'Ocorreu algum erro.' });
  }
}
server.use(errorHandler);

server.listen(process.env.PORT);