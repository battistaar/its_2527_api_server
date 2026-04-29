import { Router } from "express";
import productsRouter from './product/product.router';
import cartItemRouter from './cart-item/cart-items.router';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';

const router = Router();

router.use('/products', productsRouter);
router.use('/cart-items', cartItemRouter);
router.use('/users', userRouter);
router.use(authRouter);

export default router;
