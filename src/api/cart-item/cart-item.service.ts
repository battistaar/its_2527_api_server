import { CartItem } from './cart-item.entity';
import productSrv from '../product/product.service';

const cart: CartItem[] = [];
export class CartItemService {
  async find(): Promise<CartItem[]> {
    return this.populateCartItem(cart);
  }

  private async _getById(id: string): Promise<CartItem | null> {
    const item = cart.find(element => element.id === id);
    return item ?? null;
  }
  
  async getById(id: string): Promise<CartItem | null> {
    const item = await this._getById(id);
    
    return !!item ? this.populateCartItem(item) : null;
  }
  
  async add(item: Omit<CartItem, 'id'>): Promise<CartItem> {
    const id: string = cart.length.toString();
    const newItem = {
      id,
      ...item
    };
    cart.push(newItem);
    return this.populateCartItem(newItem);
  }
  
  async update(id: string, data: Partial<Omit<CartItem, 'id'>>): Promise<CartItem | null> {
    const item = await this._getById(id);
    if (!item) {
      return null;
    }
    
    Object.assign(item!, data);
    

    return this.populateCartItem(item!);
  }
  
  async remove(id: string): Promise<CartItem | null> {
    const item = await this.getById(id);
    if (!item) {
      return null;
    }
    const index = cart.indexOf(item);
    
    cart.splice(index, 1);
    
    return item;
  }

  async populateCartItem(item: CartItem): Promise<CartItem>;
  async populateCartItem(item: CartItem[]): Promise<CartItem[]>;
  async populateCartItem(item: CartItem | CartItem[]): Promise<CartItem | CartItem[]> {
    if (Array.isArray(item)) {
      const promises = item.map(i => this.populateCartItem(i));
      return Promise.all(promises);
    }

    if (typeof item.product === 'object') {
      return item;
    }
    const id = item.product;
    const product = await productSrv.getById(id);

    return {
      ...item,
      product: product!
    }
  }
}

export default new CartItemService();