import { Response, NextFunction } from 'express';
import cartItemSrv from './cart-item.service';
import { TypedRequest } from '../../utils/typed-request';
import { CreateCartItemDto, UpdateCartItemDto } from './cart-item.dto';
import { IdParams } from '../../utils/id-params';
import productSrv from '../product/product.service';

export const list = async (req: TypedRequest, res: Response) => {
  let results = await cartItemSrv.find();
  res.json(results);
}

export const detail = async (req: TypedRequest<unknown, unknown, IdParams>, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const item = await cartItemSrv.getById(id);
  if (!item) {
    res.status(404);
    res.send();
    return;
  }

  res.json(item);
}

export const add = async (req: TypedRequest<CreateCartItemDto>, res: Response, next: NextFunction) => {
  const { quantity, productId } = req.body;

  const exists = await productSrv.getById(productId);

  if (!exists)  {
    res.sendStatus(404);
    return;
  }

  const toAdd = {
    quantity,
    product: productId
  }

  const added = await cartItemSrv.add(toAdd)

  res.json(added);
}

export const updateQuantity = async (req: TypedRequest<UpdateCartItemDto, unknown, IdParams>, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newQuantity = req.body.quantity;

  const updated = await cartItemSrv.update(id, { quantity: newQuantity });
  if (!updated) {
    res.status(404);
    res.send();
    return;
  }

  res.json(updated);
}

export const remove = async (req: TypedRequest<unknown, unknown, IdParams>, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const removed = await cartItemSrv.remove(id);
  if (!removed) {
    res.status(404);
    res.send();
    return;
  }

  res.send();
}