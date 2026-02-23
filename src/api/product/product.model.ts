import { model, Schema } from "mongoose";
import { Product } from "./product.entity";

const productSchema = new Schema<Product>({
  name: { type: String },
  description: String,
  netPrice: Number,
  weight: Number,
  discount: Number
});

productSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const ProductModel = model<Product>('Product', productSchema);
