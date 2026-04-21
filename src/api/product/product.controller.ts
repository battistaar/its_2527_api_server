import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../utils/typed-request';
import { QueryProductDto } from './product.dto';
import productSrv from './product.service';
import { IdParams } from '../../utils/id-params';
import { NotFoundError } from '../../errors/not-found.error';

export const list = async (
  req: TypedRequest<unknown, QueryProductDto>,
  res: Response,
  next: NextFunction) => {
  try {
    const results = await productSrv.find(req.query);
    res.json(results);
  } catch(err) {
    next(err);
  }
}

export const detail = async (
  req: TypedRequest<unknown, unknown, IdParams>,
  res: Response,
  next: NextFunction) => {
    try {
      const id = req.params.id;
      const item = await productSrv.getById(id);
      if (!item) {
        throw new NotFoundError();
      }

      res.json(item);
    } catch(err) {
      next(err);
    }
}
