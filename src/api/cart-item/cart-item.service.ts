import { CartItem } from './cart-item.entity';
import { CartItemDocument, CartItemModel } from './cart-item.model';

export class CartItemService {

  async find(userId: string): Promise<CartItem[]> {
    const cart = await CartItemModel.find({ user: userId }).populate('product');
    return cart;
  }

  private async _getById(id: string, userId: string): Promise<CartItemDocument | null> {
    const item = await CartItemModel.findOne({ _id: id, user: userId });
    return item ?? null;
  }

  async getById(id: string, userId: string): Promise<CartItem | null> {
    const item = await this._getById(id, userId);

    return !!item ? item.populate('product') : null;
  }

  async addOrUpdate(item: Omit<CartItem, 'id'>, userId: string): Promise<CartItem> {
    const inCart = await this.getByProduct(item.product as string, userId);
    if (!inCart) {
      return this.add(item, userId);
    } else {
      const res = await this.update(inCart.id, { quantity: inCart.quantity + item.quantity}, userId);
      return res!;
    }
  }

  async add(item: Omit<CartItem, 'id'>, userId: string): Promise<CartItem> {
    const toAdd = {
      ...item,
      user: userId
    }
    const newItem = await CartItemModel.create(toAdd);
    return newItem.populate('product');
  }

  async update(id: string, data: Partial<Omit<CartItem, 'id'>>, userId: string): Promise<CartItem | null> {
    const item = await this._getById(id, userId);
    if (!item) {
      return null;
    }
    Object.assign(item!, data);
    const updated = await item.save();

    return updated.populate('product');
  }

  async remove(id: string, userId: string): Promise<CartItem | null> {
    const item = await this.getById(id, userId);
    if (!item) {
      return null;
    }
    await CartItemModel.deleteOne({_id: id});

    return item;
  }

  async getByProduct(productId: string, userId: string): Promise<CartItem | null> {
    const exists = await CartItemModel.findOne({ product: productId, user: userId }).populate('product');
    return exists;
  }
}

export default new CartItemService();
