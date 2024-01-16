const { PrismaClient } = require('@prisma/client');
const generalListFoodsDt = require('./dataSeed/generalListFoodData.json');

const prisma = new PrismaClient();

async function createGeneralListFood() {
  const generalListFoods = await Promise.all(generalListFoodsDt.map(async (generaListFoodData) => {
    const general_List_Food = await prisma.general_List_Food.upsert({
      where: { id: generaListFoodData.id },
      update: {},
      create: generaListFoodData,
    });
    return general_List_Food;
  }));
  return generalListFoods;
}

module.exports = {
    createGeneralListFood,
};