/* eslint-disable */
// src/api/services/userAndSchoolService.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllUsersAndSchoolsData = async () => {
  const allUserData = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      role: true,
      lastLogin: true,
      school_user: {
        select: {
          school: {
            select: {
              inep: true,
            },
          },
        },
      },
    },
  });

  await prisma.$disconnect();

  return allUserData;
};

module.exports = {
  getAllUsersAndSchoolsData,
};
