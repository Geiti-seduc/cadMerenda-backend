const { PrismaClient } = require('@prisma/client');
const offeredProductsData = require('./dataSeed/offeredProductsData.json');

const prisma = new PrismaClient();

async function createOfferedProducts() {
  const offeredProducts = await Promise.all(offeredProductsData.map(async (offeredProductData) => {
    const offeredProduct = await prisma.offered_Products.upsert({
      where: { id: offeredProductData.id },
      update: {},
      create: offeredProductData,
    });
    return offeredProduct;
  }));
  return offeredProducts;
}

module.exports = {
  createOfferedProducts,
};
