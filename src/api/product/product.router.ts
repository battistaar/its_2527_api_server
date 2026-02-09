import { Router } from "express";
import { list } from "./product.controller";

const router = Router();

router.get('/', list);

export default router;