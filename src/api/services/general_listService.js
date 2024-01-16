/* eslint-disable max-lines */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const General_List = prisma.general_List;

// eslint-disable-next-line max-lines-per-function
const getGeneral_List = async () => {
  const general_List = await General_List.findMany({
    select: {
      id: true,
      cycle_id: true,
      description: true,
      modality_id: true,
      general_list_food: {
        select: {
          id: true,
          food_id: true,
          food: {
            select: {
              id: true,
              name: true,
              measure: true,
              category: true,
              description: true,
              nmc: true,
            },
          },
        },
      },
    },
  });

  const general_listFormated = [];
  const general_listEmpty = general_List.filter((list) => list.general_list_food.length === 0);
  // eslint-disable-next-line max-lines-per-function, array-callback-return
  general_List.map((list) => {
    if (list.general_list_food.length === 0) {
      const listMap = {
        id: list.id,
        cycle_id: list.cycle_id,
        name: list.name,
        description: list.description,
        modality_id: list.modality_id,
      };
      general_listEmpty.push(listMap);
      return;
    }
    const listMap = {
      id: list.id,
      cycle_id: list.cycle_id,
      name: list.name,
      description: list.description,
      modality_id: list.modality_id,
      general_list_food: [
        ...list.general_list_food.map((food) => ({
          id: food.id,
          food_id: food.food_id,
          nmc: food.food.nmc,
          name: food.food.name,
          measure: food.food.measure,
          category: food.food.category,
          description: food.food.description,
        })),
      ],
    };

    general_listFormated.push(listMap);
  });
  return { general_List: general_listFormated, general_listEmpty };
};

// eslint-disable-next-line max-lines-per-function
const getGeneral_ListById = async (id) => {
  const General_ListById = await General_List.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      cycle_id: true,
      description: true,
      modality_id: true,
      general_list_food: {
        select: {
          id: true,
          food_id: true,
          food: {
            select: {
              id: true,
              name: true,
              measure: true,
              category: true,
              description: true,
              nmc: true,
            },
          },
        },
      },
    },
  });

  const General_List_Formatted = {
    id: General_ListById.id,
    cycle_id: General_ListById.cycle_id,
    description: General_ListById.description,
    modality_id: General_ListById.modality_id,
    general_list_food: [
      // eslint-disable-next-line sonarjs/no-identical-functions
      ...General_ListById.general_list_food.map((food) => ({
        id: food.id,
        food_id: food.food_id,
        nmc: food.food.nmc,
        measure: food.food.measure,
        category: food.food.category,
        description: food.food.description,
      })),
    ],
  };

  return General_List_Formatted;
};

// eslint-disable-next-line max-lines-per-function
const getGeneral_ListBySchool = async (school_id) => {
  const schoolModalities = await prisma.school_Modality.findMany({
    where: {
      school_inep: school_id,
    },
    select: {
      id: true,
      modality: {
        select: {
          id: true,
          general_list: {
            select: {
              id: true,
              general_list_food: true,
            },
          },
        },
      },
    },
  });

  return schoolModalities;
};

// eslint-disable-next-line max-lines-per-function
const getGeneral_ListByCycle = async (cycle_id) => {
  const General_ListByCycle = await General_List.findMany({
    where: {
      cycle_id,
    },
    select: {
      id: true,
      cycle_id: true,
      modality: true,
      description: true,
      modality_id: true,
      general_list_food: {
        select: {
          food: {
            select: {
              id: true,
              name: true,
              measure: true,
              category: true,
              description: true,
              nmc: true,
            },
          },
        },
      },
    },
  });
  const General_ListByCycle_Formatted = [];
  // eslint-disable-next-line max-lines-per-function, array-callback-return
  General_ListByCycle.map((list) => {
    const listMap = {
      id: list.id,
      cycle_id: list.cycle_id,
      description: list.description,
      modality_id: list.modality_id,
      modality_name: list.modality.name,
      general_list_food: [
        ...list.general_list_food.map((food) => ({
          id: food.food.id,
          nmc: food.food.nmc,
          name: food.food.name,
          measure: food.food.measure,
          category: food.food.category,
          description: food.food.description,
        })),
      ],
    };

    General_ListByCycle_Formatted.push(listMap);
  });
  return General_ListByCycle_Formatted;
};

const getGeneral_ListByCycleAndModality = async (cycle_id, modality_id) => {
  const General_ListByCycleAndModality = await General_List.findMany({
    where: {
      cycle_id,
      modality_id,
    },
  });
  return General_ListByCycleAndModality;
};

const getGeneralListByInepAndModality = async (school_inep, cycle_id) => {
  const General_ListByInepAndModality = await prisma.school_Modality.findMany({
    where: {
      school_inep,
      modality: {
        general_list: {
          some: {
            cycle_id,
          },
        },
      },
    },
    select: {
      id: true,
      modality: {
        select: {
          id: true,
          name: true,
          general_list: {
            select: {
              id: true,
              description: true,
              modality_id: true,
              general_list_food: {
                select: {
                  food: {
                    select: {
                      id: true,
                      name: true,
                      measure: true,
                      category: true,
                      description: true,
                      nmc: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const General_ListByInepAndModality_Formatted = [];
  // eslint-disable-next-line max-lines-per-function, array-callback-return
  General_ListByInepAndModality.map((list) => {
    const listMap = {
      id: list.modality.general_list[0].id,
      description: list.modality.general_list[0].description,
      modality_id: list.modality.id,
      modality_name: list.modality.name,
      general_list_food: [
        ...list.modality.general_list[0].general_list_food.map((food) => ({
          id: food.food.id,
          nmc: food.food.nmc,
          name: food.food.name,
          measure: food.food.measure,
          category: food.food.category,
          description: food.food.description,
        })),
      ],
    };

    General_ListByInepAndModality_Formatted.push(listMap);
  });
  return General_ListByInepAndModality_Formatted;
};

const createGeneral_List = async (General_ListData) => {
  const newGeneral_List = await General_List.create({
    data: General_ListData,
  });
  return newGeneral_List;
};

// -- Update generalList de cima:
// eslint-disable-next-line max-lines-per-function
const updateGeneralListModalityAndListFood = async (id, General_ListData) => {
  const General_Data = {
    modality_id: General_ListData.modality_id,
    description: General_ListData.description,
  };
  try {
    const oldGeneral_List = await General_List.findUnique({ where: { id } });
    if (oldGeneral_List) {
      const updatedGeneral_List = await General_List.update({
        where: { id: oldGeneral_List.id },
        data: General_Data,
      });
      return updatedGeneral_List;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao atualizar a lista geral.');
  }
};

const updateGeneral_List = async (id, General_ListData) => {
  const oldGeneral_List = await General_List.findUnique({ where: { id } });
  if (oldGeneral_List) {
    const updatedGeneral_List = await General_List.update({
      where: { id },
      data: General_ListData,
    });

    return updatedGeneral_List;
  }
  return null;
};

const deleteGeneral_List = async (id) => {
  const deletedGeneral_List = await General_List.findUnique({ where: { id } });
  if (deletedGeneral_List) {
    await prisma.$transaction([
      prisma.general_List_Food.deleteMany({ where: { general_list_id: id } }),
      prisma.general_List.delete({ where: { id } }),
    ]);
    return deletedGeneral_List;
  }
  return null;
};

module.exports = {
  getGeneral_List,
  getGeneral_ListById,
  getGeneral_ListBySchool,
  getGeneral_ListByCycle,
  getGeneral_ListByCycleAndModality,
  createGeneral_List,
  updateGeneral_List,
  deleteGeneral_List,
  getGeneralListByInepAndModality,
  updateGeneralListModalityAndListFood,
};