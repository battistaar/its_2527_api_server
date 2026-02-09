import { Router } from "express";
import { add, detail, list } from "./cart-item.controller";

const router = Router();

router.get('/', list);
router.get('/:id', detail);
router.post('/', add);

export default router;