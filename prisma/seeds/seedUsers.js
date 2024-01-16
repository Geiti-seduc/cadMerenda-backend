const { PrismaClient } = require('@prisma/client');
const usersData = require('./dataSeed/usersData.json');

const prisma = new PrismaClient();

async function seedUsers() {
  const users = Promise.all(usersData.map(async (userData) => {
    const user = prisma.user.upsert({
      where: { id: userData.id },
      update: {},
      create: userData,
    });
    return user;
  }));
  return users;
}

module.exports = {
  seedUsers,
};
