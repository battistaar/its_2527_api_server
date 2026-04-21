import { plainToClass } from "class-transformer";
import { NextFunction, Response } from "express";
import { validate as classValidate } from "class-validator";
import { TypedRequest } from "./typed-request";

function validateFn<T extends object>(dtoClass: new() => T, origin: 'body')
  : (req: TypedRequest<T>, res: Response, next: NextFunction) => Promise<void>;
function validateFn<T extends object>(dtoClass: new() => T, origin: 'query')
  : (req: TypedRequest<unknown, T>, res: Response, next: NextFunction) => Promise<void>;
function validateFn<T extends object>(dtoClass: new() => T, origin: 'params')
  : (req: TypedRequest<unknown, unknown, T>, res: Response, next: NextFunction) => Promise<void>;
function validateFn<T extends object>(dtoClass: new() => T, origin: 'body' | 'query' | 'params') {
  return async function(req: TypedRequest<any, any, any>, res: Response, next: NextFunction) {
    const data = plainToClass(dtoClass, req[origin]);
    const errors = await classValidate(data);
    if (errors.length === 0) {
      req[origin] = data;
      next();
    } else {
      console.log(errors);
      res.sendStatus(400);
    }
  }
}

export const validate = validateFn;
