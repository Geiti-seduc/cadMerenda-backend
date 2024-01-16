const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const User = prisma.user;
const School = prisma.school;
const School_User = prisma.school_User;

const getUsers = async () => {
  const users = await User.findMany({
    where: {
      active: true,
    },
  });
  return users;
};

const getInactiveUsers = async () => {
  const users = await User.findMany({
    where: {
      active: false,
    },
  });
  return users;
};

const getUserbyId = async (id) => {
  const user = await User.findUnique({ where: { id }, include: { school_user: true } });
  return user;
};

const getUserbyEmail = async (email) => {
  const user = await User.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const createUser = async (userData) => {
  const { id, email, name, password, role, lastLogin } = userData;
  const newUser = await User.create({
    data: {
      id,
      email,
      name,
      password,
      role,
      lastLogin,
    },
  });
  return newUser;
};

const updateUser = async (id, userData) => {
  const { email, name, hashedPassword, role } = userData;
  const updatedUser = await User.findUnique({ where: { id } });
  if (updatedUser) {
    await User.update({
      where: { id },
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });
    return userData;
  }
  return null;
};

const deleteUser = async (id) => {
  const userDelete = await User.findUnique({ where: { id } });
  if (userDelete) {
    await prisma.$transaction([
      prisma.logs.deleteMany({ where: { userId: id } }),
      prisma.supplier.deleteMany({ where: { user_id: id } }),
      prisma.certificate.deleteMany({ where: { user_id: id } }),
      prisma.school_User.deleteMany({ where: { user_id: id } }),
      prisma.access.deleteMany({ where: { user_id: id } }),
      prisma.user.delete({ where: { id } }),
    ]);
    return userDelete;
  }
  return null;
};

const getUser_ID = async (id) => {
  const user = await User.findUnique({ where: { id } });
  return user.id;
};

// eslint-disable-next-line max-lines-per-function
const createUserAndAssociateToSchool = async (userData, schoolInep) => {
  try {
    const { id, email, name, password, role, lastLogin } = userData;
    const newUser = await User.create({
      data: {
        id,
        email,
        name,
        password,
        role,
        lastLogin,
      },
    });
    const school = await School.findUnique({ where: { inep: schoolInep } });
    if (school) {
      await School_User.create({
        data: {
          role: 'Gestor', // userData.role,
          school_inep: schoolInep,
          user_id: newUser.id,
        },
      });
    }
    return newUser;
  } catch (error) {
    console.error('Erro em createUserAndAssociateToSchool:', error);
    throw error;
  }
};

// eslint-disable-next-line
const updateAndAssociateToSchool = async (userData, schoolInep) => {
  try {
    const { id, email, name, password, role, lastLogin } = userData;
    const newUser = await User.update({
      where: { id },
      data: {
        email,
        name,
        password,
        role,
        lastLogin,
      },
    });
    const school = await School.findUnique({ where: { inep: schoolInep } });
    if (school) {
      const schoolUser = await School_User.findFirst({
        where: { user_id: id },
      });
      await School_User.update({
        where: { id: schoolUser.id },
        data: {
          role: 'Gestor', // userData.role,
          school_inep: schoolInep,
          user_id: newUser.id,
        },
      });
    }
    return newUser;
  } catch (error) {
    console.error('Erro em updateUserAndAssociateToSchool:', error);
    throw error;
  }
};

module.exports = {
  getUsers,
  getInactiveUsers,
  getUserbyId,
  getUserbyEmail,
  createUser,
  updateUser,
  deleteUser,
  getUser_ID,
  createUserAndAssociateToSchool,
  updateAndAssociateToSchool,
};
