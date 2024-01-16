const { PrismaClient } = require('@prisma/client');
const generalListsData = require('./dataSeed/generalListData.json');

const prisma = new PrismaClient();

async function createGeneralList() {
  const generalLists = await Promise.all(generalListsData.map(async (generalListData) => {
    const general_List = await prisma.general_List.upsert({
      where: { id: generalListData.id },
      update: {},
      create: generalListData,
    });
    return general_List;
  }));
  return generalLists;
}

module.exports = {
  createGeneralList,
};