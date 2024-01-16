const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const School = prisma.school;

const getSchools = async () => {
  const schools = await School.findMany();
  return schools;
};

const getSchoolById = async (school_id, modalities) => {
  const schoolById = await School.findUnique({
    where: {
      inep: school_id,
    },
    include: {
      Address: true,
    },
  });
  if (!schoolById) return null;
  return {
    ...schoolById,
    modalities,
  };
};

const getSchoolByCity = async (city) => {
  const schoolByCity = await School.findMany({
    where: {
      Address: {
        city,
      },
    },
  });
  return schoolByCity;
};

const getSchoolByGee = async (geeId) => {
  const schoolByGee = await School.findMany({
    where: {
      geeId,
    },
  });
  return schoolByGee;
};

const getSchoolByGeeAndCity = async (geeId, city) => {
  const schoolByGeeAndCity = await School.findMany({
    where: {
      geeId,
      Address: {
        city,
      },
    },
  });
  return schoolByGeeAndCity;
};

const createSchool = async (schoolData) => {
  const { inep, name, cnpj, phone, email, geeId, addressId } = schoolData;
  const newSchool = await School.create({
    data: {
      inep,
      name,
      cnpj,
      phone,
      email,
      addressId,
      geeId,
    },
  });
  return newSchool;
};

const updateSchool = async (inep, schoolData) => {
  const { name, cnpj, phone, email, addressId, geeId } = schoolData;
  const oldSchool = await School.findUnique({ where: { inep } });
  if (oldSchool) {
    const updatedSchool = await School.update({
      where: { inep },
      data: {
        name,
        cnpj,
        phone,
        email,
        addressId,
        geeId,
      },
    });

    return updatedSchool;
  }
  return null;
};

const deleteSchool = async (inep) => {
  const deletedSchool = await School.findUnique({ where: { inep } });
  if (deletedSchool) {
    await School.delete({ where: { inep } });
    return deletedSchool;
  }
};

module.exports = {
  getSchools,
  getSchoolById,
  getSchoolByCity,
  getSchoolByGee,
  createSchool,
  updateSchool,
  deleteSchool,
  getSchoolByGeeAndCity,
};
