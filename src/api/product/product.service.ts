import { Product } from "./product.entity";
import productsData from '../../../products.json';
import { QueryProductDto } from "./product.dto";

const products: Product[] = productsData;

export class ProductService {

    async find(filters: QueryProductDto): Promise<Product[]> {
        let results = products;
        let { name, minPrice, maxPrice } = filters;

        results = results.filter(item => {
            if (name !== undefined) {
                const searchName =  name.toLocaleLowerCase();
                const itemName = item.name.toLocaleLowerCase();
                const itemDescription = item.description.toLocaleLowerCase();
                const match = itemName.includes(searchName) || itemDescription.includes(searchName);
                if (!match) {
                    return false;
                }      
            }

            if (minPrice !== undefined) {
                const match = item.netPrice >= parseFloat(minPrice);
                if (!match) {
                    return false;
                } 
            }

            if (maxPrice !== undefined) {
                const match = item.netPrice <= parseFloat(maxPrice);
                if (!match) {
                    return false;
                } 
            }

            return true;
        });

        return results;
    }

    async getById(id: string): Promise<Product | null> {
        const item = products.find(item => item.id === id);
        return item ?? null;
    }

}

export default new ProductService();