import { cart } from '../../cart-data';

export class CartItemService {
  async find() {
    return cart;
  }
  
  async getById(id: string) {
    const item = cart.find(element => element.id === id);
    
    return item ?? null;
  }
  
  async add(item) {
    const id: string = cart.length.toString();
    const newItem = {
      id,
      ...item
    };
    cart.push(newItem);
    return newItem;
  }
  
  async update(id, data) {
    const item = await this.getById(id);
    if (!item) {
      return null;
    }
    
    Object.assign(item, data);
    
    return item;
  }
  
  async remove(id) {
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