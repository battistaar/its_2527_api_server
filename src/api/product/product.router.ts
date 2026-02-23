import { Router } from "express";
import { list, detail } from "./product.controller";

const router = Router();

router.get('/', list);
router.get('/:id', detail);

export default router;
