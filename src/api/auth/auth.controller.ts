import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import { RegisterDto } from "./auth.dto";
import userSrv from '../user/user.service';
import { omit, pick } from 'lodash';
import { UserExistsError } from "../../errors/user-exists.error";

export const register = async (
  req: TypedRequest<RegisterDto>,
  res: Response,
  next: NextFunction) => {
    try {
      const userData = omit(req.body, 'username', 'password');
      const credentials = pick(req.body, 'username', 'password');

      const newUser = await userSrv.add(userData, credentials);
      res.json(newUser);

    } catch(err) {
      if (err instanceof UserExistsError) {
        res.status(400);
        res.json({
          error: err.name,
          message: err.message
        });
      } else {
        next(err);
      }
    }
  }
