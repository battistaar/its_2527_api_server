import { cart } from '../../cart-data';

export async function find() {
    return cart;
}

export async function getById(id: string) {
    const item = cart.find(element => element.id === id);
    
    return item ?? null;
}

export async function add(item) {
    const id: string = cart.length.toString();
    const newItem = {
        id,
        ...item
    };
    cart.push(newItem);
    return newItem;
}

export async function update(id, data) {
    const item = await getById(id);
    if (!item) {
        return null;
    }

    Object.assign(item, data);
    
    return item;
}