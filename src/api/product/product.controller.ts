import products from '../../../products.json';
import { Request, Response, NextFunction } from 'express';

export const list = (req: Request, res: Response, next: NextFunction) => {
  res.json(products);
}