const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Access = prisma.access;

const getAcess = async () => {
  const allAccess = await Access.findMany();
  return allAccess;
};

const getAcessById = async (access_id) => {
  const acessId = await Access.findUnique({
    where: {
      id: access_id,
    },
  });
  return acessId;
};

const createAcess = async (accessData) => {
  const newAccess = await Access.create({ data: accessData });
  return newAccess;
};

module.exports = {
  getAcess,
  getAcessById,
  createAcess,
};
