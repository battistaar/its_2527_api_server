import { Router } from "express";
import { list, detail } from "./product.controller";
import { validate } from "../../utils/validation-middleware";
import { QueryProductDto } from "./product.dto";
import { IdParams } from "../../utils/id-params";

const router = Router();

router.get('/', validate(QueryProductDto, 'query'), list);
router.get('/:id', validate(IdParams, 'params'), detail);

export default router;
