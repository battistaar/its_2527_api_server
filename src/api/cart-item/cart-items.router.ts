import { Router } from "express";
import { add, detail, list, remove, updateQuantity } from "./cart-item.controller";
import { validate } from "../../utils/validation-middleware";
import { CreateCartItemDto } from "./cart-item.dto";

const router = Router();

router.get('/', list);
router.get('/:id', detail);
router.post('/', validate(CreateCartItemDto, 'body'), add);
router.put('/:id', updateQuantity);
router.delete('/:id', remove);

export default router;
