const { PrismaClient } = require('@prisma/client');
const requestedsData = require('./dataSeed/requestedProductsData.json');

const prisma = new PrismaClient();

async function createRequestedProducts() {
    const requestedProducts = Promise.all(requestedsData.map(async (requestedData) => {
        const requestedProduct = prisma.requested_Products.upsert({
            where: { id: requestedData.id },
            update: {},
            create: requestedData,
        });
        return requestedProduct;
    }));
    return requestedProducts;
}

module.exports = {
    createRequestedProducts,
  };