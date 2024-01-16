const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Offered = prisma.offered_Products;

const getOffered = async () => {
  const allOffered = await Offered.findMany();
  return allOffered;
};

const getOfferedById = async (Offered_id) => {
  const OfferedId = await Offered.findUnique({
    where: {
      id: Offered_id,
    },
  });
  return OfferedId;
};

const getOfferedByFoodIdAndOfferId = async (OfferedData) => {
  const OfferedId = await Offered.findMany({
    where: {
      offer_id: OfferedData.offer_id,
      food_id: OfferedData.food_id,
    },
  });
  return OfferedId;
};

const createOffered = async (OfferedData) => {
  const newOffered = await Offered.create({
    data: OfferedData,
  });
  return newOffered;
};

const updateOffered = async (Offered_id, OfferedData) => {
  const OfferedId = await Offered.findUnique({
    where: {
      id: Offered_id,
    },
  });
  if (!OfferedId) throw new Error('Offered not found');

  const updatedOffered = await Offered.update({
    where: {
      id: Offered_id,
    },
    data: {
      ...OfferedData,
    },
  });
  return updatedOffered;
};

const updateOfferedByFoodIdAndOfferId = async (OfferedData) => {
  const OfferedId = await Offered.findMany({
    where: {
      offer_id: OfferedData.offer_id,
      food_id: OfferedData.food_id,
    },
  });
  if (!OfferedId) throw new Error('Offered not found');
  const updatedOffered = await Offered.update({
    where: {
      id: OfferedId[0].id,
    },
    data: {
      ...OfferedData,
    },
  });
  return updatedOffered;
};

const deleteOffered = async (Offered_id) => {
  const OfferedDeleted = await Offered.findUnique({
    where: {
      id: Offered_id,
    },
  });

  if (!OfferedDeleted) throw new Error('Offered not found');

  const deletedOffered = await Offered.delete({
    where: {
      id: Offered_id,
    },
  });
  return deletedOffered;
};

module.exports = {
  getOffered,
  getOfferedById,
  getOfferedByFoodIdAndOfferId,
  createOffered,
  updateOffered,
  updateOfferedByFoodIdAndOfferId,
  deleteOffered,
};
