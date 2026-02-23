import { faker } from '@faker-js/faker/locale/it';
import { ProductModel } from './src/api/product/product.model';
import mongoose from 'mongoose';

function generateRandomProduct() {
    return {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        netPrice: parseFloat(faker.commerce.price()), // 15.5
        weight: faker.number.int({ min: 50, max: 2000 }),
        discount: faker.number.float({ min: 0, max: 1, fractionDigits: 2 })
    }
}

async function generateProducts(numOfProducts: number) {
    const data = Array.from({length: numOfProducts}, () => generateRandomProduct());
    return ProductModel.create(data);
}

const numOfProducts = 200;
mongoose.connect('mongodb://localhost:27017/its-cart')
  .then(() => {
    return ProductModel.deleteMany({});
  })
  .then(() => {
    return generateProducts(numOfProducts);
  })
  .then(() => {
    console.log(`inserted ${numOfProducts} products`);
    process.exit();
  })
  .catch(err => {
    console.error(err);
  })
