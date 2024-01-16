/* eslint-disable */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Cycle = prisma.cycle;

const getCycles = async () => {
  const allCycles = await Cycle.findMany();
  return allCycles;
};

const getCycleById = async (cycleId) => {
  const cycle = await Cycle.findUnique({
    where: {
      id: cycleId,
    },
  });
  return cycle;
};

const getLastCycle = async () => {
  const lastCycle = await Cycle.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return lastCycle;
}

const getLastPendingCycle = async () => {
  const cycles = await Cycle.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const lastPendingCycle = cycles[1];
  return lastPendingCycle;
}

const createCycle = async (cycleData) => {
  const newCycle = await Cycle.create({
    data: cycleData,
  });
  return newCycle;
};


const updateCycle = async (cycleId, cycleData) => {
  const cycle = await Cycle.findUnique({
    where: {
      id: cycleId,
    },
  });
  if (!cycle) {
    throw new Error('Cycle not found');
  }

  const updatedCycle = await Cycle.update({
    where: {
      id: cycleId,
    },
    data: {
      ...cycleData,
    },
  });
  return updatedCycle;
};

const deleteCycle = async (cycleId) => {
  const cycle = await Cycle.findUnique({
    where: {
      id: cycleId,
    },
  });
  if (cycle) {
    await Cycle.delete({
      where: {
        id: cycleId,
      },
    });
    return cycle;
  }
};

module.exports = {
  getCycles,
  getCycleById,
  getLastCycle,
  getLastPendingCycle,
  createCycle,
  updateCycle,
  deleteCycle,
};
