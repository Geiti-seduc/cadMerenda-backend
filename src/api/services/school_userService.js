const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const School_User = prisma.school_User;

const getSchool_Users = async () => {
  const school_users = await School_User.findMany();
  return school_users;
};

const getSchool_UserById = async (id) => {
  const userById = await School_User.findUnique({
    where: {
      id,
    },
  });
  return userById;
};

const createSchool_User = async (userData) => {
  const { role, school_inep, user_id } = userData;
  const newUser = await School_User.create({
    data: {
      role,
      school_inep,
      user_id,
    },
  });
  return newUser;
};

const updateSchool_User = async (id, userData) => {
    const { role, school_inep, user_id } = userData;
  const oldUser = await School_User.findUnique({ where: { id } });
  if (oldUser) {
    const updatedUser = await School_User.update({
      where: { id },
      data: {
        id,
        role,
        school_inep,
        user_id,
      },
    });

    return updatedUser;
  }
  return null;
};

const deleteSchool_User = async (id) => {
  const deletedUser = await School_User.findUnique({ where: { id } });
  if (deletedUser) {
    await School_User.delete({ where: { id } });
    return deletedUser;
  }
};

const getSchool_UserByInep = async (inep) => {
  const userByInep = await School_User.findMany({
    where: {
      school_inep: inep,
    },
  });
  return userByInep;
};

module.exports = {
    getSchool_Users,
    getSchool_UserById,
    getSchool_UserByInep,
    createSchool_User,
    updateSchool_User,
    deleteSchool_User,
};
