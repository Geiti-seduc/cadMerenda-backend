const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const general_list_food = prisma.general_List_Food;

const getgeneral_list_food = async () => {
  const allgeneral_list_food = await general_list_food.findMany({
    include: {
      food: true,
      general_list: {
        include: {
          modality: true,
        },
      },
    },
  });
  return allgeneral_list_food;
};

const getgeneral_list_foodById = async (general_list_food_id) => {
  const general_list_foodId = await general_list_food.findUnique({
    where: {
      id: general_list_food_id,
    },
  });
  return general_list_foodId;
};

const getgeneral_list_foodByFoodId = async (food_id, general_list_id) => {
  const general_list_foodId = await general_list_food.findMany({
    where: {
      food_id,
      general_list_id,
    },
  });
  return general_list_foodId;
};

const creategeneral_list_food = async (general_list_foodData) => {
  const existinggeneral_list_food = await getgeneral_list_foodByFoodId(
    general_list_foodData.food_id,
    general_list_foodData.general_list_id,
  );
  if (existinggeneral_list_food.length > 0) {
    return { error: 'Food already exists in this general list' };
  }
  const newgeneral_list_food = await general_list_food.create({
    data: general_list_foodData,
  });
  return newgeneral_list_food;
};

const updategeneral_list_food = async (general_list_food_id, general_list_foodData) => {
  const general_list_foodId = await general_list_food.findUnique({
    where: {
      id: general_list_food_id,
    },
  });
  if (!general_list_foodId) throw new Error('general_list_food not found');

  const updatedgeneral_list_food = await general_list_food.update({
    where: {
      id: general_list_food_id,
    },
    data: {
      ...general_list_foodData,
    },
  });
  return updatedgeneral_list_food;
};

const deletegeneral_list_food = async (general_list_food_id) => {
  const general_list_foodDeleted = await general_list_food.findUnique({
    where: {
      id: general_list_food_id,
    },
  });

  if (!general_list_foodDeleted) throw new Error('general_list_food not found');

  const deletedgeneral_list_food = await general_list_food.delete({
    where: {
      id: general_list_food_id,
    },
  });
  return deletedgeneral_list_food;
};

const deletegeneral_list_foodByFoodId = async (food_id, general_list_id) => {
  const general_list_foodDeleted = await general_list_food.findMany({
    where: {
      food_id,
      general_list_id,
    },
  });
  if (!general_list_foodDeleted) return null;
  await general_list_food.deleteMany({
    where: {
      food_id,
      general_list_id,
    },
  });
  return general_list_foodDeleted;
};

module.exports = {
  getgeneral_list_food,
  getgeneral_list_foodById,
  getgeneral_list_foodByFoodId,
  creategeneral_list_food,
  updategeneral_list_food,
  deletegeneral_list_food,
  deletegeneral_list_foodByFoodId,
};
