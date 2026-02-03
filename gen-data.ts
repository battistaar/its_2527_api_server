import { faker } from '@faker-js/faker/locale/it';
import { writeFileSync } from 'node:fs';

function generateRandomProduct() {
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        netPrice: parseFloat(faker.commerce.price()), // 15.5
        weight: faker.number.int({ min: 50, max: 2000 }),
        discount: faker.number.float({ min: 0, max: 1, fractionDigits: 2 })
    }
}

function generateProducts(numOfProducts: number) {
    const data = Array.from({length: numOfProducts}, () => generateRandomProduct());
    writeFileSync('./products.json', JSON.stringify(data), { encoding: 'utf-8' });
}

generateProducts(200);