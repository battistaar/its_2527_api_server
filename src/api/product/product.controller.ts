import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../utils/typed-request';
import { QueryProductDto } from './product.dto';
import productSrv from './product.service';
import { IdParams } from '../../utils/id-params';

export const list = async (
  req: TypedRequest<unknown, QueryProductDto>,
  res: Response,
  next: NextFunction) => {
    console.log(req.query);
    const results = await productSrv.find(req.query);
    res.json(results);
}

export const detail = async (
  req: TypedRequest<unknown, unknown, IdParams>,
  res: Response,
  next: NextFunction) => {
    const id = req.params.id;
    const item = await productSrv.getById(id);
    if (!item) {
      res.status(404);
      res.send();
      return;
    }
    res.json(item);
}