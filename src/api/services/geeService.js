const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const GEE = prisma.gee;

const getGEE = async () => {
  const allGEE = await GEE.findMany();
  return allGEE;
};

const getGEEById = async (GEE_id) => {
  const GEEId = await GEE.findUnique({
    where: {
      id: GEE_id,
    },
  });
  return GEEId;
};

const createGEE = async (GEEData) => {
  const newGEE = await GEE.create({
    data: GEEData,
  });
  return newGEE;
};

const updateGEE = async (GEE_id, GEEData) => {
  const GEEId = await GEE.findUnique({
    where: {
      id: GEE_id,
    },
  });
  if (!GEEId) throw new Error('GEE not found');

  const updatedGEE = await GEE.update({
    where: {
      id: GEE_id,
    },
    data: {
      ...GEEData,
    },
  });
  return updatedGEE;
};

const deleteGEE = async (GEE_id) => {
  const GEEDeleted = await GEE.findUnique({
    where: {
      id: GEE_id,
    },
  });

  if (!GEEDeleted) throw new Error('GEE not found');

  const deletedGEE = await GEE.delete({
    where: {
      id: GEE_id,
    },
  });
  return deletedGEE;
};

module.exports = {
  getGEE,
  getGEEById,
  createGEE,
  updateGEE,
  deleteGEE,
};
