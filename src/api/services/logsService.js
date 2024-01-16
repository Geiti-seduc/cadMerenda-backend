const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const Logs = prisma.logs;

const createLog = async (logData) => {
  const { table, column, operation, oldValue, newValue, userId, referenceId } = logData;
  await Logs.create({
    data: {
      table,
      column,
      operation,
      oldValue,
      newValue,
      userId,
      referenceId,
    },
  });
};

module.exports = {
  createLog,
};
