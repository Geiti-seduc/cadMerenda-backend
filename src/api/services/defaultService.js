const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const User = prisma.user;

const updateLogin = async (user_id, lastLogin) => {
  await User.update({
    where: {
      id: user_id,
    },
    data: {
      lastLogin,
    },
  });
  return lastLogin;
};

module.exports = {
  updateLogin,
};
