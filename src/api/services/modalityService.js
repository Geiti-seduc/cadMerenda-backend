const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Modality = prisma.modality;

const getModalities = async () => {
  const allModalities = await Modality.findMany();
  return allModalities;
};

const getModalityById = async (id) => {
  const ModalityId = await Modality.findUnique({
    where: {
      id,
    },
  });
  return ModalityId;
};

const createModality = async (ModalityData) => {
  const createNewModality = await Modality.create({
    data: ModalityData,
  });
  return createNewModality;
};

const updateModality = async (id, ModalityData) => {
  const findModality = await Modality.findUnique({
    where: {
      id,
    },
  });
  if (findModality) {
    const newModality = await Modality.update({
      where: {
        id,
      },
      data: ModalityData,
    });
    return newModality;
  }
  return null;
};

const deleteModality = async (id) => {
  const findModality = await Modality.findUnique({
    where: {
      id,
    },
  });
  if (findModality) {
    const ModalityDel = await Modality.delete({
      where: {
        id,
      },
    });
    return ModalityDel;
  }
};

module.exports = {
  getModalities,
  getModalityById,
  createModality,
  updateModality,
  deleteModality,
};
