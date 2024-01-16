const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const school_modality = prisma.school_Modality;

const getschool_modality = async () => {
  const allschool_modality = await school_modality.findMany();
  return allschool_modality;
};

const getschool_modalityByInep = async (school_inep, modality_id) => {
  const school_modalityId = await school_modality.findMany({
    where: {
      school_inep,
      modality_id,
    },
  });
  return school_modalityId;
};

const getschool_modalityById = async (school_modality_id) => {
  const school_modalityId = await school_modality.findUnique({
    where: {
      id: school_modality_id,
    },
  });
  return school_modalityId;
};

const createschool_modality = async (school_modalityData) => {
  const newschool_modality = await school_modality.create({
    data: school_modalityData,
  });
  return newschool_modality;
};

const updateschool_modality = async (school_modality_id, school_modalityData) => {
  const school_modalityId = await school_modality.findUnique({
    where: {
      id: school_modality_id,
    },
  });
  if (!school_modalityId) throw new Error('school_modality not found');

  const updatedschool_modality = await school_modality.update({
    where: {
      id: school_modality_id,
    },
    data: {
      ...school_modalityData,
    },
  });
  return updatedschool_modality;
};

const deleteschool_modality = async (school_modality_id) => {
  const school_modalityDeleted = await school_modality.findUnique({
    where: {
      id: school_modality_id,
    },
  });

  if (!school_modalityDeleted) throw new Error('school_modality not found');

  const deletedschool_modality = await school_modality.delete({
    where: {
      id: school_modality_id,
    },
  });
  return deletedschool_modality;
};

const getSchoolModalities = async (school_inep) => {
  const schoolModalities = await school_modality.findMany({
    where: {
      school_inep,
    },
    select:
    {
      modality: {
        select: {
          name: true,
        },
      },    
    },
  });
  return schoolModalities;
};

module.exports = {
  getschool_modality,
  getschool_modalityById,
  getSchoolModalities,
  getschool_modalityByInep,
  createschool_modality,
  updateschool_modality,
  deleteschool_modality,
};
