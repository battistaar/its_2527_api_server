import { Router } from "express";
import { add, detail, list, remove, updateQuantity } from "./cart-item.controller";
import { validate } from "../../utils/validation-middleware";
import { CreateCartItemDto, UpdateCartItemDto } from "./cart-item.dto";
import { IdParams } from "../../utils/id-params";

const router = Router();

router.get('/', list);
router.get('/:id', validate(IdParams, 'params'), detail);
router.post('/', validate(CreateCartItemDto, 'body'), add);
router.put('/:id',
  validate(IdParams, 'params'),
  validate(UpdateCartItemDto, 'body'),
  updateQuantity);
router.delete('/:id', validate(IdParams, 'params'), remove);

export default router;
