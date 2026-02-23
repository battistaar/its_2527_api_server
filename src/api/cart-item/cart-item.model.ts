import { HydratedDocument, model, Schema } from "mongoose";
import { CartItem } from "./cart-item.entity";

const cartItemSchema = new Schema<CartItem>({
  quantity: Number,
  product: { type: Schema.Types.ObjectId, ref: 'Product' }
});

cartItemSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

cartItemSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export type CartItemDocument = HydratedDocument<CartItem>;

export const CartItemModel = model<CartItem>('CartItem', cartItemSchema);
