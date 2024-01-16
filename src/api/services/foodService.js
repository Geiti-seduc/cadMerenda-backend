const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Food = prisma.food;

const getAllFood = async () => {
  const allFood = await Food.findMany();
  return allFood;
};

const getFoodById = async (id) => {
  const foodId = await Food.findUnique({
    where: {
      id,
    },
  });
  return foodId;
};

const createFood = async (foodData) => {
  const createNewFood = await Food.create({
    data: foodData,
  });
  return createNewFood;
};

const updateFood = async (id, foodData) => {
  const findFood = await Food.findUnique({
    where: {
      id,
    },
  });
  if (findFood) {
    const newFood = await Food.update({
      where: {
        id,
      },
      data: foodData,
    });
    return newFood;
  }
  return null;
};

const deleteFood = async (id) => {
  const findFood = await Food.findUnique({
    where: {
      id,
    },
  });
  if (findFood) {
    const foodDel = await Food.delete({
      where: {
        id,
      },
    });
    return foodDel;
  }
};

module.exports = {
  getAllFood,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
