const { PrismaClient } = require('@prisma/client');
const geesData = require('./dataSeed/geeData.json');

const prisma = new PrismaClient();

async function createGees() {
  const gees = await Promise.all(geesData.map(async (geeData) => {
    const gee = await prisma.gee.upsert({
      where: { id: geeData.id },
      update: {},
      create: geeData,
    });
    return gee;
  }));

  return gees;
}

module.exports = {
  createGees,
};