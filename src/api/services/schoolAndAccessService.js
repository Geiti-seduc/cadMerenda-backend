/* eslint-disable max-lines-per-function */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSchoolAndAccessData = async () => {
    const schoolUsers = await prisma.school_User.findMany({
      include: {
        school: {
          select: {
            inep: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    const accessData = await Promise.all(
      schoolUsers.map(async (schoolUser) => {
        const lastAccess = await prisma.access.findFirst({
          where: {
            user_id: schoolUser.user.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        const formattedLastAccessDate = lastAccess
          ? new Date(lastAccess.createdAt).toLocaleString('pt-BR', {
              timeZone: 'America/Sao_Paulo',
            })
          : null;

        return {
          inep: schoolUser.school.inep,
          name: schoolUser.school.name,
          lastAccessDate: formattedLastAccessDate,
        };
      }),
    );

    const accessMap = new Map();

    accessData.forEach((access) => {
      if (
        !accessMap.has(access.inep) 
        || (access.lastAccessDate
        && accessMap.get(access.inep).lastAccessDate < access.lastAccessDate)
      ) {
        accessMap.set(access.inep, access);
      }
    });

    const uniqueAccessData = Array.from(accessMap.values());
    await prisma.$disconnect();
    return uniqueAccessData.map(({ inep, name, lastAccessDate }) => ({
      inep,
      name,
      lastAccessDate,
    }));
};

module.exports = {
  getSchoolAndAccessData,
};
