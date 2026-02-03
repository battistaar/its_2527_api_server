import { createServer } from 'node:http';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { cart } from './cart-data';

const app = express();

app.use(cors());
app.use(morgan('tiny'));

app.use(bodyParser.json());

app.get('/api/cart-items', (req: Request, res: Response) => {
  console.log(req.query);
  let limit = Number.MAX_VALUE;
  if (req.query.limit) {
    limit = parseInt(req.query.limit as string);
  }

  let results = cart.slice(0, limit);
  res.json(results);
});

app.get('/api/cart-items/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);
  const id = parseInt(req.params.id as string);
  const item = cart[id];
  if (!item) {
    res.status(404);
    res.send();
    return;
  }

  res.json(item);
});

app.post('/api/cart-items', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const newItem = req.body;

  cart.push(newItem);

  res.json(newItem);
});

const server = createServer(app);

server.listen(3000);