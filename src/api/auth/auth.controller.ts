import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import { RegisterDto } from "./auth.dto";

export const register = async (
  req: TypedRequest<RegisterDto>,
  res: Response,
  next: NextFunction) => {
    res.send();
  }
