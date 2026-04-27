import { Types } from "mongoose";
import { Product } from "../product/product.entity";

export interface CartItem {
    id: string;
    product: string | Product;
    quantity: number;
    user?: Types.ObjectId;
}
