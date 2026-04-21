import { Response, NextFunction } from 'express';
import { TypedRequest } from '../../utils/typed-request';
import { QueryProductDto } from './product.dto';
import productSrv from './product.service';
import { IdParams } from '../../utils/id-params';
import { NotFoundError } from '../../errors/not-found.error';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const list = async (
  req: TypedRequest<unknown, QueryProductDto>,
  res: Response,
  next: NextFunction) => {
  try {
    const query = plainToClass(QueryProductDto, req.query);
    const errors = await validate(query);
    console.log(errors);
    if (errors.length) {
      // torno errore al client e non procedo
    }

    const results = await productSrv.find(query);
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
