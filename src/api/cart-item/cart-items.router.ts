import { Router } from "express";
import { add, detail, list, remove, updateQuantity } from "./cart-item.controller";

const router = Router();

router.get('/', list);
router.get('/:id', detail);
router.post('/', add);
router.put('/:id', updateQuantity);
router.delete('/:id', remove);

export default router;