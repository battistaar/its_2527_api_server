import { Request, Response, NextFunction } from 'express';
import { getById, add as addItem, update, find } from './cart-item.service';


export const list = async (req: Request, res: Response) => {
  let results = await find();
  res.json(results);
}

export const detail = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const item = await getById(id);
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

  const added = await addItem(newItem)

  res.json(added);
}

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id as string;
  const newQuantity: number = req.body.quantity;

  const updated = await update(id, { quantity: newQuantity });
  if (!updated) {
    res.status(404);
    res.send();
    return;
  }

  res.json(updated);
}