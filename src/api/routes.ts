import { Router } from "express";
import productsRouter from './product/product.router';
import cartItemRouter from './cart-item/cart-items.router';

const router = Router();

router.use('/products', productsRouter);
router.use('/cart-items', cartItemRouter);

export default router;