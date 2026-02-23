import { CartItem } from './cart-item.entity';
import productSrv from '../product/product.service';
import { CartItemDocument, CartItemModel } from './cart-item.model';
import { isValidObjectId } from 'mongoose';

export class CartItemService {
  async find(): Promise<CartItem[]> {
    const cart = await CartItemModel.find();
    return this.populateCartItem(cart);
  }

  private async _getById(id: string): Promise<CartItemDocument | null> {
    const item = await CartItemModel.findById(id);
    return item ?? null;
  }

  async getById(id: string): Promise<CartItem | null> {
    const item = await this._getById(id);

    return !!item ? this.populateCartItem(item) : null;
  }

  async addOrUpdate(item: Omit<CartItem, 'id'>): Promise<CartItem> {
    const inCart = await this.getByProduct(item.product as string);
    if (!inCart) {
      return this.add(item);
    } else {
      const res = await this.update(inCart.id, { quantity: inCart.quantity + item.quantity});
      return res!;
    }
  }

  async add(item: Omit<CartItem, 'id'>): Promise<CartItem> {
    const newItem = await CartItemModel.create(item);
    return this.populateCartItem(newItem);
  }

  async update(id: string, data: Partial<Omit<CartItem, 'id'>>): Promise<CartItem | null> {
    const item = await this._getById(id);
    if (!item) {
      return null;
    }
    Object.assign(item!, data);
    const updated = await item.save();

    return this.populateCartItem(updated!);
  }

  async remove(id: string): Promise<CartItem | null> {
    const item = await this.getById(id);
    if (!item) {
      return null;
    }
    await CartItemModel.deleteOne({_id: id});

    return item;
  }

  async getByProduct(productId: string): Promise<CartItem | null> {
    const exists = await CartItemModel.findOne({ product: productId });
    return !!exists? this.populateCartItem(exists) : null;
  }

  async populateCartItem(item: CartItemDocument): Promise<CartItem>;
  async populateCartItem(item: CartItemDocument[]): Promise<CartItem[]>;
  async populateCartItem(item: CartItemDocument | CartItemDocument[]): Promise<CartItem | CartItem[]> {
    if (Array.isArray(item)) {
      const promises = item.map(i => this.populateCartItem(i));
      return Promise.all(promises);
    }

    if (!isValidObjectId(item.product)) {
      return item;
    }
    const id = item.product;
    const product = await productSrv.getById(id as string);

    const res ={
      ...item.toObject(),
      product: product!
    };
    return res;
  }
}

export default new CartItemService();
