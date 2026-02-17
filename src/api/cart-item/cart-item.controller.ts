import { Request, Response, NextFunction } from 'express';
import cartItemSrv from './cart-item.service';

export const list = async (req: Request, res: Response) => {
  let results = await cartItemSrv.find();
  res.json(results);
}

export const detail = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const item = await cartItemSrv.getById(id);
  if (!item) {
    res.status(404);
    res.send();
    return;
  }

  res.json(item);
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const newItem = req.body;

  const added = await cartItemSrv.add(newItem)

  res.json(added);
}

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id as string;
  const newQuantity: number = req.body.quantity;

  const updated = await cartItemSrv.update(id, { quantity: newQuantity });
  if (!updated) {
    res.status(404);
    res.send();
    return;
  }

  res.json(updated);
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id as string;
  const removed = await cartItemSrv.remove(id);
  if (!removed) {
    res.status(404);
    res.send();
    return;
  }

  res.send();
}