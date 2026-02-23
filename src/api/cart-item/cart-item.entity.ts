import { Product } from "../product/product.entity";

export interface CartItem {
    id: string;
    product: string | Product;
    quantity: number;
}