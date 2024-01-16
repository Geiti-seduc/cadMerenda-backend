const { PrismaClient } = require('@prisma/client');
const foodsData = require('./dataSeed/foodData.json');

const prisma = new PrismaClient();

async function createFoods() {
  const foods = await Promise.all(foodsData.map(async (foodData) => {
    const food = await prisma.food.upsert({
      where: { id: foodData.id },
      update: {},
      create: foodData,
    });
    return food;
  }));

  return foods;
}

module.exports = {
  createFoods,
};