import { CartItem } from './cart-item.entity';
import { CartItemDocument, CartItemModel } from './cart-item.model';

export class CartItemService {
  async find(): Promise<CartItem[]> {
    const cart = await CartItemModel.find().populate('product');
    return cart;
  }

  private async _getById(id: string): Promise<CartItemDocument | null> {
    const item = await CartItemModel.findById(id);
    return item ?? null;
  }

  async getById(id: string): Promise<CartItem | null> {
    const item = await this._getById(id);

    return !!item ? item.populate('product') : null;
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
    return newItem.populate('product');
  }

  async update(id: string, data: Partial<Omit<CartItem, 'id'>>): Promise<CartItem | null> {
    const item = await this._getById(id);
    if (!item) {
      return null;
    }
    Object.assign(item!, data);
    const updated = await item.save();

    return updated.populate('product');
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
    const exists = await CartItemModel.findOne({ product: productId }).populate('product');
    return exists;
  }
}

export default new CartItemService();
