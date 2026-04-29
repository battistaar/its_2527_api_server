import { Response, NextFunction } from 'express';
import cartItemSrv from './cart-item.service';
import { TypedRequest } from '../../utils/typed-request';
import { CreateCartItemDto, UpdateCartItemDto } from './cart-item.dto';
import { IdParams } from '../../utils/id-params';
import productSrv from '../product/product.service';
import { NotFoundError } from '../../errors/not-found.error';

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    let results = await cartItemSrv.find(req.user!.id);
    res.json(results);
  } catch(err) {
    next(err);
  }
}

export const detail = async (req: TypedRequest<unknown, unknown, IdParams>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const item = await cartItemSrv.getById(id, req.user!.id);
    if (!item) {
      throw new NotFoundError();
    }

    res.json(item);
  } catch(err) {
    next(err);
  }
}

export const add = async (req: TypedRequest<CreateCartItemDto>, res: Response, next: NextFunction) => {
  try {
    const { quantity, productId } = req.body;
    console.log(req.body);
    const exists = await productSrv.getById(productId);

    if (!exists)  {
      throw new NotFoundError();
    }

    const toAdd = {
      quantity,
      product: productId
    }

    const result = await cartItemSrv.addOrUpdate(toAdd, req.user!.id);

    res.json(result);
  } catch(err) {
    next(err);
  }
}

export const updateQuantity = async (
  req: TypedRequest<UpdateCartItemDto, unknown, IdParams>,
  res: Response,
  next: NextFunction) => {

  try {
    const id = req.params.id;
    const newQuantity = req.body.quantity;

    const updated = await cartItemSrv.update(id, { quantity: newQuantity }, req.user!.id);
    if (!updated) {
      throw new NotFoundError();
    }

    res.json(updated);
  } catch(err) {
    next(err);
  }

}

export const remove = async (req: TypedRequest<unknown, unknown, IdParams>, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const removed = await cartItemSrv.remove(id, req.user!.id);
    if (!removed) {
      throw new NotFoundError();
    }

    res.send();
  } catch(err) {
    next(err);
  }
}
