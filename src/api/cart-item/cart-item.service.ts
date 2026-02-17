import { CartItem } from './cart-item.entity';

const cart: CartItem[] = [];
export class CartItemService {
  async find(): Promise<CartItem[]> {
    return cart;
  }
  
  async getById(id: string): Promise<CartItem | null> {
    const item = cart.find(element => element.id === id);
    
    return item ?? null;
  }
  
  async add(item: Omit<CartItem, 'id'>): Promise<CartItem> {
    const id: string = cart.length.toString();
    const newItem = {
      id,
      ...item
    };
    cart.push(newItem);
    return newItem;
  }
  
  async update(id: string, data: Partial<Omit<CartItem, 'id'>>): Promise<CartItem | null> {
    const item = await this.getById(id);
    if (!item) {
      return null;
    }
    
    Object.assign(item, data);
    
    return item;
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
}

export default new CartItemService();