import { Request, Response, NextFunction } from 'express';
import { cart } from '../../cart-data';

export const list = (req: Request, res: Response) => {
  console.log(req.query);
  let limit = Number.MAX_VALUE;
  if (req.query.limit) {
    limit = parseInt(req.query.limit as string);
  }

  let results = cart.slice(0, limit);
  res.json(results);
}

export const detail = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params);
  const id = parseInt(req.params.id as string);
  const item = cart[id];
  if (!item) {
    res.status(404);
    res.send();
    return;
  }

  res.json(item);
}

export const add = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const newItem = req.body;

  cart.push(newItem);

  res.json(newItem);
}